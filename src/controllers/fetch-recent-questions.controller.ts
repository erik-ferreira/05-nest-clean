import z from "zod"
import { Controller, Get, Query, UseGuards } from "@nestjs/common"

import { PrismaService } from "@/prisma/prisma.service"
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe"
import { AuthGuard } from "@nestjs/passport"

const pageQueryParamSchema = z.coerce.number().int().min(1).default(1)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryPageValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query("page", queryPageValidationPipe) page: PageQueryParamSchema,
  ) {
    const perPage = 1

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: "desc" },
    })

    return { questions }
  }
}
