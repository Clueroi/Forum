import { AnswerRepository } from "../repositories/answer-repository"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { Either, right, left } from "src/core/either"
import { ResourceNotFoundError } from "@/core/errors/Errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error"

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId:string
    answerId:string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question
}>


export class ChooseQuestionBestAnswerUseCase {

    constructor(
        private answersRepository: AnswerRepository,
        private questionsRepository: QuestionsRepository
    ) { }


    async execute({
        authorId,
        answerId,
    }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)

        if(!answer){
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRepository.findById(answer.questionId.toString())

        if(!question){
            return left(new ResourceNotFoundError())
        }

        if(authorId !== question.authorId.toString()){
            return left( new NotAllowedError())
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return right({
            question
        })
    }
}