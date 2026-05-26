import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment"

import { Comment as PrismaComment } from "@/generated/prisma/client"

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaComment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error("Invalid comment type.")
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
