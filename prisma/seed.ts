import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
const prisma = new PrismaClient();
async function main() {
    const daphneId = v4();
    // Alunos
    await prisma.aluno.upsert({
        where: { email: "daphne@dog.com" },
        update: {},
        create: {
            email: "daphne@dog",
            nome: "Daphne",
            password: "12345",
            idade: 3,
            id: daphneId,
        },
    });

    await prisma.aluno.upsert({
        where: { email: "max@cat.com" },
        update: {},
        create: {
            email: "max@cat.com",
            nome: "Max",
            password: "54321",
            idade: 5,
        },
    });
    await prisma.aluno.upsert({
        where: { email: "buddy@dog.com" },
        update: {},
        create: {
            email: "buddy@dog.com",
            nome: "Buddy",
            password: "abc123",
            idade: 2,
        },
    });
    await prisma.aluno.upsert({
        where: { email: "luna@cat.com" },
        update: {},
        create: {
            email: "luna@cat.com",
            nome: "Luna",
            password: "password123",
            idade: 1,
        },
    });
    await prisma.aluno.upsert({
        where: { email: "rocky@dog.com" },
        update: {},
        create: {
            email: "rocky@dog.com",
            nome: "Rocky",
            password: "rocky123",
            idade: 4,
        },
    });

    const alunos =
        // Projetos
        await prisma.projeto.upsert({
            where: {
                id: v4(),
            },
            update: {},
            create: {
                descricao: "Projeto Calculadora React",
                ferramenta: "React",
                status: "A",
                alunoId: daphneId,
            },
        });
    await prisma.projeto.upsert({
        where: {
            id: v4(),
        },
        update: {},
        create: {
            descricao: "Projeto de Gerenciamento de Tarefas",
            ferramenta: "Angular",
            status: "A", // Ativo
            alunoId: daphneId,
        },
    });
    await prisma.projeto.upsert({
        where: {
            id: v4(),
        },
        update: {},
        create: {
            descricao: "Projeto de Blog Pessoal",
            ferramenta: "Node.js",
            status: "E", // Em andamento
            alunoId: daphneId,
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
