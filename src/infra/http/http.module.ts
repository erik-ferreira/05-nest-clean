import { Module } from "@nestjs/common"

import { DatabaseModule } from "@/infra/database/database.module"

import { AuthenticateController } from "@/infra/http/controllers/authenticate.controller"
import { CreateAccountController } from "@/infra/http/controllers/create-account.controller"
import { CreateQuestionController } from "@/infra/http/controllers/create-question.controller"
import { GetQuestionBySlugController } from "@/infra/http/controllers/get-question-by-slug.controller"
import { FetchRecentQuestionsController } from "@/infra/http/controllers/fetch-recent-questions.controller"

import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question"
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student"
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug"
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student"
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions"

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
