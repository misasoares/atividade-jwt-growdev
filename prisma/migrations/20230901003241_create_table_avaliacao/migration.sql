-- CreateTable
CREATE TABLE "avaliacao" (
    "id" UUID NOT NULL,
    "disciplina" VARCHAR(30) NOT NULL,
    "nota" DECIMAL(4,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);
