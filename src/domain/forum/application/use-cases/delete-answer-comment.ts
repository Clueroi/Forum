import { Either, left, right } from "src/core/either";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";



interface DeleteAnswerCommentUseCaseRequest{
    authorId:string
    answerCommentId:string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>


export class DeleteAnswerCommentUseCase{
    constructor(
        private answerRepository: AnswerCommentRepository
    ){ }

    async execute({
        authorId,
        answerCommentId
    }:DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse>{
        const answerComment = await this.answerRepository.findbyId(answerCommentId)

        if(!answerComment){
            return left('Not Found')
        }

        if(answerComment.authorId.toString() !== authorId){
            return left('Not Allowed')
        }

        await this.answerRepository.delete(answerComment)

        return right({})
    }

}