import { Injectable } from "@nestjs/common"

import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author"
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository"

import { Either, right } from "@/core/either"

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments =
      await this.answerCommentRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({ comments })
  }
}
