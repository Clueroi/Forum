import { AnswerCommentRepository } from "../repositories/answer-comment-repository";



interface DeleteAnswerCommentUseCaseRequest{
    authorId:string
    answerCommentId:string
}

interface DeleteAnswerCommentUseCaseResponse{}


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
            throw new Error('Not found')
        }

        if(answerComment.authorId.toString() !== authorId){
            throw new Error('Not Allowed')
        }

        await this.answerRepository.delete(answerComment)

        return {}
    }

}