import { questionCommentRepository } from "src/domain/forum/application/repositories/question-comment-repository";
import { QuestionComment } from "src/domain/forum/enterpriste/entities/question-comment";


export class InMemoryQuestionComment implements questionCommentRepository{

    public items:QuestionComment[] = []

    async create(questionComment: QuestionComment){
        this.items.push(questionComment)

    }
    
}