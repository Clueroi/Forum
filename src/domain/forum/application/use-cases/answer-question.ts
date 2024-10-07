import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"

interface AnswerQuestionUseCaseRequest {
    instructorId: string

    questionId: string
    content: string
}

interface AnswerQuestionUseCaseResponse {
    answer: Answer
}


export class AnswerQuestionUseCase {

    constructor(private answersRepository: AnswerRepository) { }


    async execute({
        instructorId,
        questionId,
        content
    }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId),
        })

        await this.answersRepository.create(answer)

        return {
            answer
        }
    }
}