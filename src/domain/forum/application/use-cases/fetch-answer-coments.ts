import { AnswerComment } from "../../enterpriste/entities/answer-comment"
import { AnswerCommentRepository } from "../repositories/answer-comment-repository"

interface FetchAnswerCommentUseCaseRequest {
    page: number
    answerId: string
}

interface FetchAnswerCommentUseCaseResponse {
    answerComments: AnswerComment[]
}


export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentsRepository: AnswerCommentRepository) { }

    async execute({
        page,
        answerId
    }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
        const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

        if (!answerComments) {
            throw new Error('Question not found')
        }

        return {
            answerComments
        }
    }
}