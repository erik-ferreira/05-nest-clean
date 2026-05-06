import { Question } from "@/domain/forum/enterprise/entities/question"

import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Either, right } from "@/core/either"

interface FetchRecentQuestionCaseRequest {
  page: number
}

type FetchRecentQuestionCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionCaseRequest): Promise<FetchRecentQuestionCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({ questions })
  }
}
