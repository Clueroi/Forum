import { QuestionComment } from "../../enterpriste/entities/question-comment";

export interface questionCommentRepository{
    create(questionComment:QuestionComment):Promise<void>
}