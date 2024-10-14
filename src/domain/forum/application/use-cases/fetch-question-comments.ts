import { Either, left, right } from "src/core/either"
import { QuestionComment } from "../../enterpriste/entities/question-comment"
import { questionCommentRepository } from "../repositories/question-comment-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"

interface FetchQuestionCommentsUseCaseRequest {
    page: number
    questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<ResourceNotFoundError, {
    questionComments: QuestionComment[]
}>


export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentRepository: questionCommentRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page })

        if (!questionComments) {
            return left(new ResourceNotFoundError())
        }

        return right({
            questionComments
        })
    }
}