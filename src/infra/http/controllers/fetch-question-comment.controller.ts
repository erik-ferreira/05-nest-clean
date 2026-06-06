import z from "zod"
import {
  Get,
  Query,
  Controller,
  Param,
  BadRequestException,
} from "@nestjs/common"

import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"

import { FetchQuestionCommentsCase } from "@/domain/forum/application/use-cases/fetch-question-comment"

import { CommentPresenter } from "@/infra/http/presenters/comment-presenter"

const pageQueryParamSchema = z.coerce.number().int().min(1).default(1)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryPageValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/questions/:questionId/answers")
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsCase) {}

  @Get()
  async handle(
    @Query("page", queryPageValidationPipe) page: PageQueryParamSchema,
    @Param("questionId") questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questionComments = result.value.questionComments

    return { comments: questionComments.map(CommentPresenter.toHTTP) }
  }
}
