import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer"

import { makeAnswer } from "@/test/factories/make-answer"

import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { InMemoryStudentsRepository } from "@/test/repositories/in-memory-students-repository"
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository"
import { InMemoryAnswerAttachmentRepository } from "@/test/repositories/in-memory-answer-attachments-repository"

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CommentOnAnswerUseCase

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentsRepository,
    )
  })

  it("should be able to comment on answer", async () => {
    const question = makeAnswer()

    await inMemoryAnswersRepository.create(question)

    await sut.execute({
      answerId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste",
    })

    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual(
      "Comentário teste",
    )
  })
})
