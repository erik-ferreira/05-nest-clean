import { FetchRecentQuestionCase } from "./fetch-recent-questions"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository"

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionCase

describe("Fetch Recent Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new FetchRecentQuestionCase(inMemoryQuestionsRepository)
  })

  it("should be able to delete a question", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2026, 0, 23) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2026, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 18) }),
    ])
  })

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.questions).toHaveLength(2)
  })
})
