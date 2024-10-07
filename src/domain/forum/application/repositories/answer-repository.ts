import { Answer } from "../../enterpriste/entities/answer";


export interface AnswerRepository{
    findById(id:string):Promise<Answer | null >
    create(answer:Answer):Promise<void>
    delete(answer:Answer):Promise<void>
}