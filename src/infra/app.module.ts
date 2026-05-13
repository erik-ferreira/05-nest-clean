import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { CreateAccountController } from "@/infra/http/controllers/create-account.controller"

import { envSchema } from "@/infra/env"
import { AuthModule } from "@/infra/auth/auth.module"
import { PrismaService } from "@/infra/prisma/prisma.service"

import { AuthenticateController } from "@/infra/http/controllers/authenticate.controller"
import { CreateQuestionController } from "@/infra/http/controllers/create-question.controller"
import { FetchRecentQuestionsController } from "@/infra/http/controllers/fetch-recent-questions.controller"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
