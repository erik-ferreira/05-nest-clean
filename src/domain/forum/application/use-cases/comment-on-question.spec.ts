import { CommentOnQuestionUseCase } from "./comment-on-question"

import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-question-repository"
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { InMemoryQuestionAttachmentRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsCommentsRepository,
    )
  })

  it("should be able to comment on question", async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste",
    })

    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual(
      "Comentário teste",
    )
  })
})
