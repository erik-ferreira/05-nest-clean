import { AuthGuard } from "@nestjs/passport"
import { Controller, Post, UseGuards } from "@nestjs/common"
import { CurrentUser } from "@/auth/create-user-decorator"
import type { UserPayload } from "@/auth/jwt.strategy"

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionController {
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user.sub)

    return "ok"
  }
}
