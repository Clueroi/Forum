import { PaginationParams } from "src/core/repositories/pagination-params";
import { AnswerComment } from "../../enterpriste/entities/answer-comment";

export interface AnswerCommentRepository{
    findManyByAnswerId(answerId:string, page:PaginationParams):Promise<AnswerComment[]>
    delete(answerComment: AnswerComment):Promise<AnswerComment | void>
    findbyId(id: string):Promise<AnswerComment | null>
    create(answerComment:AnswerComment):Promise<void>
}