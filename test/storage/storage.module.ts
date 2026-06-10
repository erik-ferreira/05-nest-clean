import { Module } from "@nestjs/common"

import { Uploader } from "@/domain/forum/application/storage/uploader"

import { EnvModule } from "@/infra/env/env.module"

import { R2STorage } from "./r2-storage"

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: R2STorage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
