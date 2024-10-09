import { questionCommentRepository } from "../repositories/question-comment-repository"


interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId:string
}

interface DeleteQuestionCommentUseCaseResponse {}


export class DeleteQuestionCommentUseCase {

    constructor(
        private questionComment: questionCommentRepository
    ) { }


    async execute({
        authorId,
        questionCommentId
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
        const questionComment = await this.questionComment.findById(questionCommentId)

        if(!questionComment){
            throw new Error('Comment does not exists')
        }

        if(questionComment.authorId.toString() !== authorId){
            throw new Error('Not Allowed')
        }

        await this.questionComment.delete(questionComment)

        return {
            questionComment
        }
    }
}