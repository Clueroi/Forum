import { AnswerRepository } from "src/domain/forum/application/repositories/answer-repository";
import { Answer } from "src/domain/forum/enterpriste/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository{
    public items: Answer[] = []


    async create(answer: Answer){
        this.items.push(answer)
    }
    
}