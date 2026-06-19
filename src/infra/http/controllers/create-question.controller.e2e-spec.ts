import request from "supertest"
import { Test } from "@nestjs/testing"
import { JwtService } from "@nestjs/jwt"
import { INestApplication } from "@nestjs/common"

import { AppModule } from "@/infra/app.module"

import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { DatabaseModule } from "@/infra/database/database.module"

import { StudentFactory } from "@/test/factories/make-student"
import { AttachmentFactory } from "@/test/factories/make-attachment"

describe.skip("Create Question (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let studentFactory: StudentFactory
  let attachmentFactory: AttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, AttachmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    studentFactory = moduleRef.get(StudentFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)

    await app.init()
  })

  test("[POST] /questions", async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "New Question",
        content: "Question content",
        attachments: [attachment1, attachment2],
      })

    expect(response.statusCode).toBe(201)

    const questionOnDatabase = await prisma.question.findFirst({
      where: { title: "New Question" },
    })

    expect(questionOnDatabase).toBeTruthy()

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        questionId: questionOnDatabase?.id,
      },
    })

    expect(attachmentOnDatabase).toHaveLength(2)
  })
})
