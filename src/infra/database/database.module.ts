import { Module } from "@nestjs/common"

import { PrismaService } from "./prisma/prisma.service"
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository"
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-questions-comments-repository"
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-questions-attachments-repository"

import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository"
import { PrismaAnswersCommentsRepository } from "./prisma/repositories/prisma-answers-comments-repository"
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answers-attachments-repository"

@Module({
  providers: [
    PrismaService,

    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,

    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,

    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,

    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
