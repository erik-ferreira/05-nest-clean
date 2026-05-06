import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository"
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository"
import { SendNotificationUseCase } from "../use-cases/send-notification"
import { vi } from "vitest"
import { makeQuestion } from "test/factories/make-question"
import { waitFor } from "test/utils/wait-for"

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: any

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute")

    new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase)
  })

  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionRepository.create(question)
    inMemoryAnswerRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
