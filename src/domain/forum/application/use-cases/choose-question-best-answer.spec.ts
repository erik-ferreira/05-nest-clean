import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { makeQuestion } from "@/test/factories/make-question"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-question-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { makeAnswer } from "@/test/factories/make-answer"
import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { InMemoryAnswerAttachmentRepository } from "@/test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionAttachmentRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

let sut: ChooseQuestionBestAnswerUseCase

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-2",
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
