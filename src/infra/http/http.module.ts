import { Module } from "@nestjs/common"

import { DatabaseModule } from "@/infra/database/database.module"
import { CryptographyModule } from "@/infra/cryptography/cryptography.module"

import { EditAnswerController } from "@/infra/http/controllers/edit-answer.controller"
import { DeleteAnswerController } from "@/infra/http/controllers/delete-answer.controller"
import { AuthenticateController } from "@/infra/http/controllers/authenticate.controller"
import { EditQuestionController } from "@/infra/http/controllers/edit-question.controller"
import { CreateAccountController } from "@/infra/http/controllers/create-account.controller"
import { DeleteQuestionController } from "@/infra/http/controllers/delete-question.controller"
import { AnswerQuestionController } from "@/infra/http/controllers/answer-question.controller"
import { CreateQuestionController } from "@/infra/http/controllers/create-question.controller"
import { CommentOnQuestionController } from "@/infra/http/controllers/comment-on-question.controller"
import { CommentOnAnswerController } from "@/infra/http/controllers/comment-on-answer.controller"
import { GetQuestionBySlugController } from "@/infra/http/controllers/get-question-by-slug.controller"
import { FetchQuestionAnswersController } from "@/infra/http/controllers/fetch-question-answers.controller"
import { FetchRecentQuestionsController } from "@/infra/http/controllers/fetch-recent-questions.controller"
import { DeleteQuestionCommentController } from "@/infra/http/controllers/delete-question-comment.controller"
import { DeleteAnswerCommentController } from "@/infra/http/controllers/delete-answer-comment.controller"
import { ChooseQuestionBestAnswerController } from "@/infra/http/controllers/choose-question-best-answer.controller"
import { FetchQuestionCommentsController } from "@/infra/http/controllers/fetch-question-comment.controller"
import { FetchAnswerCommentsController } from "@/infra/http/controllers/fetch-answer-comments.controller"
import { UploadAttachmentController } from "@/infra/http/controllers/upload-attachment.controller"

import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question"
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student"
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug"
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student"
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions"
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question"
import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question"
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question"
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer"
import { DeleteAnswerUseCase } from "@/domain/forum/application/use-cases/delete-answer"
import { DeleteQuestionCommentUseCase } from "@/domain/forum/application/use-cases/delete-question-comment"
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-question-answers"
import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/use-cases/choose-question-best-answer"
import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/comment-on-question"
import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer"
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/use-cases/delete-answer-comment"
import { FetchQuestionCommentsCase } from "@/domain/forum/application/use-cases/fetch-question-comment"
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-answer-comment"

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    CommentOnAnswerController,
    DeleteQuestionCommentController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
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
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    CommentOnAnswerUseCase,
    DeleteQuestionCommentUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsCase,
    FetchAnswerCommentsUseCase,
  ],
})
export class HttpModule {}
