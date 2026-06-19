import z from "zod"
import {
  Put,
  Body,
  Param,
  HttpCode,
  UsePipes,
  Controller,
  BadRequestException,
} from "@nestjs/common"

import type { UserPayload } from "@/infra/auth/jwt.strategy"
import { CurrentUser } from "@/infra/auth/current-user-decorator"

import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"

import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question"

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller("/questions/:id")
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  @UsePipes()
  async handle(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param("id") questionId: string,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
