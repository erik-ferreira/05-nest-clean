import { FetchQuestionCommentsCase } from "./fetch-question-comment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { makeQuestionComment } from "test/factories/make-question-comment"

import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsCase

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsCase(inMemoryQuestionCommentsRepository)
  })

  it("should be able to delete a question", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") }),
    )

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-1"),
        }),
      )
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
