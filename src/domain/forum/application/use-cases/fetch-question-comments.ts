import { QuestionComment } from "../../enterpriste/entities/question-comment"
import { questionCommentRepository } from "../repositories/question-comment-repository"

interface FetchQuestionCommentsUseCaseRequest {
    page: number
    questionId: string
}

interface FetchQuestionCommentsUseCaseResponse {
    questionComments: QuestionComment[]
}


export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentRepository: questionCommentRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page })

        if (!questionComments) {
            throw new Error('Question not found')
        }

        return {
            questionComments
        }
    }
}