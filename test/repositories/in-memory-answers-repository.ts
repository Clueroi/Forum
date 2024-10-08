import { AnswerRepository } from "src/domain/forum/application/repositories/answer-repository";
import { Answer } from "src/domain/forum/enterpriste/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
    public items: Answer[] = []


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