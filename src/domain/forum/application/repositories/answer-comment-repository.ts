import { AnswerComment } from "../../enterpriste/entities/answer-comment";

export interface AnswerCommentRepository{
    delete(answerComment: AnswerComment):Promise<AnswerComment | void>
    findbyId(id: string):Promise<AnswerComment | null>
    create(answerComment:AnswerComment):Promise<void>
}