import z from "zod"
import {
  Body,
  Post,
  HttpCode,
  UsePipes,
  UseGuards,
  Controller,
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

import { PrismaService } from "@/prisma/prisma.service"

import { JwtAuthGuard } from "@/auth/jwt-auth.guard"
import type { UserPayload } from "@/auth/jwt.strategy"
import { CurrentUser } from "@/auth/current-user-decorator"

import { ZodValidationPipe } from "@/pipes/zod-validation-pipe"

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub
    const slug = this.convertToSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }
}
