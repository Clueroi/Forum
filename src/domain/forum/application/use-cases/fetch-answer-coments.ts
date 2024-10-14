import { Either, left, right } from "src/core/either"
import { AnswerComment } from "../../enterpriste/entities/answer-comment"
import { AnswerCommentRepository } from "../repositories/answer-comment-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"

interface FetchAnswerCommentUseCaseRequest {
    page: number
    answerId: string
}

type FetchAnswerCommentUseCaseResponse = Either<ResourceNotFoundError, {
    answerComments: AnswerComment[]
}>


export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentsRepository: AnswerCommentRepository) { }

    async execute({
        page,
        answerId
    }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
        const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

        if (!answerComments) {
            return left(new ResourceNotFoundError())
        }

        return right({
            answerComments
        })
    }
}