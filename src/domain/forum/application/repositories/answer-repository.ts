import { Answer } from "../../enterpriste/entities/answer";


export interface AnswerRepository{
    create(answer:Answer):Promise<void>
}