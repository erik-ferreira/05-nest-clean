import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

    super({ adapter, log: ['error', 'warn'] })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}
