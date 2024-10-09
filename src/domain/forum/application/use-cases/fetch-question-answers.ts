import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"

interface FetchQuestionAnswersUseCaseRequest {
    page: number
    questionId: string
}

interface FetchQuestionAnswersUseCaseResponse {
    answer: Answer[]
}


export class FetchQuestionAnswersUseCase {
    constructor(private answerRepository: AnswerRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
        const answer = await this.answerRepository.findManyByQuestionId(questionId, { page })

        if (!answer) {
            throw new Error('Question not found')
        }

        return {
            answer
        }
    }
}