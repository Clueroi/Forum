import { Either, left, right } from "src/core/either";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";
import { ResourceNotFoundError } from "./Errors/resource-not-found-error";
import { NotAllowedError } from "./Errors/not-allowed-error";



interface DeleteAnswerCommentUseCaseRequest{
    authorId:string
    answerCommentId:string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>


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
            return left(new ResourceNotFoundError())
        }

        if(answerComment.authorId.toString() !== authorId){
            return left(new NotAllowedError())
        }

        await this.answerRepository.delete(answerComment)

        return right({})
    }

}