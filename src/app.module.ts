import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { AppController } from "./app.controller"

import { AppService } from "./app.service"
import { PrismaService } from "./prisma/prisma.service"
import { CreateAccountController } from "@/controllers/create-account.controller"

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CreateAccountController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
