import { Prisma } from "@/generated/prisma/client"
import { Attachment } from "@/domain/forum/enterprise/entities/attachment"

export class PrismaAttachmentMapperMapper {
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
