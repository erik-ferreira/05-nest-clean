import { Injectable } from "@nestjs/common"

import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author"
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"

import { Either, right } from "@/core/either"

interface FetchQuestionCommentsCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionCommentsCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsCaseRequest): Promise<FetchQuestionCommentsCaseResponse> {
    const comments =
      await this.questionCommentRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({ comments })
  }
}
