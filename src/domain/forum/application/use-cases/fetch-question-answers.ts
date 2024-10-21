import { Either, left, right } from "src/core/either"
import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"

interface FetchQuestionAnswersUseCaseRequest {
    page: number
    questionId: string
}

type FetchQuestionAnswersUseCaseResponse = Either<null, {
    answer: Answer[]
}>


export class FetchQuestionAnswersUseCase {
    constructor(private answerRepository: AnswerRepository) { }

    async execute({
        page,
        questionId
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
        const answer = await this.answerRepository.findManyByQuestionId(questionId, { page })

        return right({
            answer
        })
    }
}