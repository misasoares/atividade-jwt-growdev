-- CreateTable
CREATE TABLE "Projeto" (
    "id" UUID NOT NULL,
    "descricao" TEXT NOT NULL,
    "ferramenta" TEXT NOT NULL,
    "status" CHAR(1) NOT NULL,
    "id_aluno" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
