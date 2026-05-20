import z from "zod"
import { Controller, Get, Query, UseGuards } from "@nestjs/common"

import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"

import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard"
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions"

const pageQueryParamSchema = z.coerce.number().int().min(1).default(1)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryPageValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query("page", queryPageValidationPipe) page: PageQueryParamSchema,
  ) {
    const questions = this.fetchRecentQuestions.execute({ page })

    return { questions }
  }
}
