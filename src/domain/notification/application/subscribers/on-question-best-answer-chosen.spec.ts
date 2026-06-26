import { OnQuestionBestAnswerChosen } from "@/domain/notification/application/subscribers/on-question-best-answer-chosen"
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification"

import { makeAnswer } from "@/test/factories/make-answer"
import { makeQuestion } from "@/test/factories/make-question"

import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { InMemoryStudentsRepository } from "@/test/repositories/in-memory-students-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-question-repository"
import { InMemoryAttachmentsRepository } from "@/test/repositories/in-memory-attachments-repository"
import { InMemoryNotificationRepository } from "@/test/repositories/in-memory-notification-repository"
import { InMemoryAnswerAttachmentRepository } from "@/test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionAttachmentRepository } from "@/test/repositories/in-memory-question-attachments-repository"

import { waitFor } from "@/test/utils/wait-for"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository

let sendNotificationExecuteSpy: any

describe("On Question Best Answer Chosen", () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute")

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it("should send a notification when question has new best answer chosen", async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
