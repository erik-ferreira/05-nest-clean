import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { NotAllowedError } from "@/core/errors/not-allowed-error"

import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question"

import { makeQuestion } from "@/test/factories/make-question"
import { makeQuestionAttachment } from "@/test/factories/make-question-attachment"

import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-question-repository"
import { InMemoryStudentsRepository } from "@/test/repositories/in-memory-students-repository"
import { InMemoryAttachmentsRepository } from "@/test/repositories/in-memory-attachments-repository"
import { InMemoryQuestionAttachmentRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: DeleteQuestionUseCase

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: "question-1",
      authorId: "author-1",
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("2"),
      }),
    )

    const result = await sut.execute({
      questionId: "question-1",
      authorId: "author-2",
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
