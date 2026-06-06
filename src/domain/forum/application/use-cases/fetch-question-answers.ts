import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"

import { Either, right } from "@/core/either"

interface FetchQuestionAnswersCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersCaseRequest): Promise<FetchQuestionAnswersCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
