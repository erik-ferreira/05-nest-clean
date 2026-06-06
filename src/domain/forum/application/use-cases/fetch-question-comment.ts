import { Injectable } from "@nestjs/common"

import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"

import { Either, right } from "@/core/either"

interface FetchQuestionCommentsCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

@Injectable()
export class FetchQuestionCommentsCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsCaseRequest): Promise<FetchQuestionCommentsCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
