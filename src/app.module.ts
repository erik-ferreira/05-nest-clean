import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { AppController } from "./app.controller"
import { CreateAccountController } from "@/controllers/create-account.controller"

import { AppService } from "./app.service"
import { PrismaService } from "./prisma/prisma.service"

import { envSchema } from "./env"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [AppController, CreateAccountController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
