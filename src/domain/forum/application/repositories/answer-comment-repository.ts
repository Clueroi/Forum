import { AnswerComment } from "../../enterpriste/entities/answer-comment";

export interface AnswerCommentRepository{
    create(answerComment:AnswerComment):Promise<void>
}