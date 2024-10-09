import { PaginationParams } from "src/core/repositories/pagination-params";
import { AnswerRepository } from "src/domain/forum/application/repositories/answer-repository";
import { Answer } from "src/domain/forum/enterpriste/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
    public items: Answer[] = []
    

    async findManyByQuestionId(questionId:string, {page}: PaginationParams) {
        const answers =  this.items
        .filter((item)=> item.questionId.toString() === questionId)
        .slice((page - 1) * 20, page * 20)

        return answers
    }


    async save(answer: Answer){
        const answerIndex = this.items.findIndex((item)=> item.id === answer.id)
        
        this.items[answerIndex] = answer
    }


    async findById(id: string) {
        const answer = this.items.find((item) => item.id.toString() === id)

        if (!answer) {
            return null
        }

        return answer
    }


    async delete(answer: Answer) {
        const answerIndex = this.items.findIndex((item) => item.id === answer.id)

        this.items.splice(answerIndex, 1)
    }


    async create(answer: Answer) {
        this.items.push(answer)
    }

}