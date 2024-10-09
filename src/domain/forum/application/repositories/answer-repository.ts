import { PaginationParams } from "src/core/repositories/pagination-params";
import { Answer } from "../../enterpriste/entities/answer";


export interface AnswerRepository{
    findManyByQuestionId(questionId:string, page:PaginationParams):Promise<Answer[]>
    findById(id:string):Promise<Answer | null >
    create(answer:Answer):Promise<void>
    delete(answer:Answer):Promise<void>
    save(answer:Answer):Promise<void>
}