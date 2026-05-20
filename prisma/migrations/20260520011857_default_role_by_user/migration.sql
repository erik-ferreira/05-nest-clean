/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `questions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_role_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- CreateIndex
CREATE UNIQUE INDEX "questions_slug_key" ON "questions"("slug");
