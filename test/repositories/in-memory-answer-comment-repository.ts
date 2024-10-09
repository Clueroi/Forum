import { PaginationParams } from "src/core/repositories/pagination-params";
import { AnswerCommentRepository } from "src/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "src/domain/forum/enterpriste/entities/answer-comment";


export class InMemoryAnswerComment implements AnswerCommentRepository {
    public items: AnswerComment[] = []


    async findManyByAnswerId(answerId:string, {page}: PaginationParams) {
        const answers =  this.items
        .filter((item)=> item.answerId.toString() === answerId)
        .slice((page - 1) * 20, page * 20)

        return answers
    }
    

    async delete(answerComment: AnswerComment) {
        const itemIndex = this.items.findIndex((item) => item.id.toString() === answerComment.id.toString())

        this.items.splice(itemIndex, 1)
    }

    async findbyId(id: string) {
        const answerQuestion = this.items.find((item) => item.id.toString() === id)

        if (!answerQuestion) {
            return null
        }

        return answerQuestion
    }

    async create(answerComment: AnswerComment) {
        this.items.push(answerComment)

    }

}