import { Injectable } from "@nestjs/common"

import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { PrismaQuestionMapper } from "@/infra/database/prisma/mappers/prisma-question-mapper"

import { PaginationParams } from "@/core/repositories/pagination-params"

import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({ where: { id } })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }
  findBySlug(slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.")
  }
  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.")
  }
  create(question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }
  save(question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }
  delete(question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
