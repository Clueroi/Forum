import { AnswerCommentRepository } from "src/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "src/domain/forum/enterpriste/entities/answer-comment";


export class InMemoryAnswerComment implements AnswerCommentRepository{

    public items:AnswerComment[] = []

    async create(answerComment: AnswerComment){
        this.items.push(answerComment)

    }
    
}