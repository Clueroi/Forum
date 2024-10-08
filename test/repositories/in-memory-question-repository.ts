import { PaginationParams } from "src/core/repositories/pagination-params";
import { QuestionsRepository } from "src/domain/forum/application/repositories/question-repository";
import { Question } from "src/domain/forum/enterpriste/entities/question";

export class InMemoryQuestionRepository implements QuestionsRepository {
    public items: Question[] = []


    async findManyRecent({ page }: PaginationParams) {
        const questions = this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page - 1) * 20, page * 20)

        return questions
    }


    async save(question: Question) {
        const itemIndex = this.items.findIndex((item) => item.id === question.id)

        this.items[itemIndex] = question
    }

    async findById(id: string) {
        const questions = this.items.find((item) => item.id.toString() === id)

        if (!questions) {
            return null
        }

        return questions
    }

    async findBySlug(slug: string) {
        const questions = this.items.find(item => item.slug.value === slug)

        if (!questions) {
            return null
        }

        return questions
    }


    async create(question: Question) {
        this.items.push(question)
    }



    async delete(question: Question) {
        const itemIndex = this.items.findIndex((item) => item.id === question.id)

        this.items.splice(itemIndex, 1)
    }

}