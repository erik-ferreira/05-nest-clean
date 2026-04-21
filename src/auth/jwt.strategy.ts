import { ConfigService } from "@nestjs/config"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"

import { Env } from "@/env"
import z from "zod"

const tokenSchema = z.object({
  sub: z.uuid(),
})

export type UserPayload = z.infer<typeof tokenSchema>

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService<Env, true>) {
    const publicKey = configService.get("JWT_PUBLIC_KEY", { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    })
  }

  async validate(payload: UserPayload) {
    return tokenSchema.parse(payload)
  }
}
