import { QuestionComment } from "../../enterpriste/entities/question-comment";

export interface questionCommentRepository{
    create(questionComment:QuestionComment):Promise<void>
    delete(questionComment: QuestionComment):Promise<void>
    findById(id:string):Promise<QuestionComment | null>
}