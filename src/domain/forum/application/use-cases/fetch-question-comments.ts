import { Either, left, right } from "src/core/either"
import { QuestionComment } from "../../enterpriste/entities/question-comment"
import { questionCommentRepository } from "../repositories/question-comment-repository"

interface FetchQuestionCommentsUseCaseRequest {
    page: number
    questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
    questionComments: QuestionComment[]
}>


export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentRepository: questionCommentRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page })

        return right({
            questionComments
        })
    }
}