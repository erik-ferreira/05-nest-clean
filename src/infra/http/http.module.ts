import { Module } from "@nestjs/common"

import { DatabaseModule } from "@/infra/database/database.module"

import { AuthenticateController } from "@/infra/http/controllers/authenticate.controller"
import { CreateAccountController } from "@/infra/http/controllers/create-account.controller"
import { AnswerQuestionController } from "@/infra/http/controllers/answer-question.controller"
import { CreateQuestionController } from "@/infra/http/controllers/create-question.controller"
import { GetQuestionBySlugController } from "@/infra/http/controllers/get-question-by-slug.controller"
import { FetchRecentQuestionsController } from "@/infra/http/controllers/fetch-recent-questions.controller"

import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question"
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student"
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug"
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student"
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions"
import { DeleteQuestionController } from "./controllers/delete-question.controller"
import { EditQuestionController } from "./controllers/edit-question.controller"
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question"
import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question"
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question"

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
  ],
})
export class HttpModule {}
