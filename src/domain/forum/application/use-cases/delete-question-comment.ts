import { Either, left, right } from "src/core/either"
import { questionCommentRepository } from "../repositories/question-comment-repository"
import { ResourceNotFoundError } from "@/core/errors/Errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error"


interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>


export class DeleteQuestionCommentUseCase {

    constructor(
        private questionComment: questionCommentRepository
    ) { }


    async execute({
        authorId,
        questionCommentId
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
        const questionComment = await this.questionComment.findById(questionCommentId)

        if (!questionComment) {
            return left(new ResourceNotFoundError())
        }

        if (questionComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError())
        }

        await this.questionComment.delete(questionComment)

        return right({})
    }
}