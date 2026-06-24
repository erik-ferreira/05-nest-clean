import z from "zod"
import {
  Get,
  Query,
  Controller,
  Param,
  BadRequestException,
} from "@nestjs/common"

import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"

import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-answer-comment"

import { CommentWithAuthorPresenter } from "@/infra/http/presenters/comment-with-author-presenter"

const pageQueryParamSchema = z.coerce.number().int().min(1).default(1)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryPageValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/answers/:answerId/comments")
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query("page", queryPageValidationPipe) page: PageQueryParamSchema,
    @Param("answerId") answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const comments = result.value.comments

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
  }
}
