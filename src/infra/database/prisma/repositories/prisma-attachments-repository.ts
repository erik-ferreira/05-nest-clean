import { Injectable } from "@nestjs/common"

import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { PrismaAttachmentMapper } from "@/infra/database/prisma/mappers/prisma-attachment-mapper"

import { Attachment } from "@/domain/forum/enterprise/entities/attachment"
import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachments-repository"

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({ data })
  }
}
