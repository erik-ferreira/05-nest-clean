import { hash, compare } from "bcryptjs"

import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer"
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator"

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SAL_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SAL_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
