import { PaginationParams } from "src/core/repositories/pagination-params";
import { QuestionComment } from "../../enterpriste/entities/question-comment";

export interface questionCommentRepository{
    create(questionComment:QuestionComment):Promise<void>
    delete(questionComment: QuestionComment):Promise<void>
    findById(id:string):Promise<QuestionComment | null>
    findManyByQuestionId(questionId: string, params:PaginationParams):Promise<QuestionComment[]>
}