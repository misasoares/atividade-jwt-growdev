/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Aluno";

-- CreateTable
CREATE TABLE "aluno" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "idade" INTEGER,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");
