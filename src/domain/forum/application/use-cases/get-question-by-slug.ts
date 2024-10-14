import { Either, left, right } from "src/core/either"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"

interface GetQuestionBySlugUseCaseRequest{
    slug:string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
    question:Question
}>


export class GetQuestionBySlugUseCase{
    constructor(private questionRepository: QuestionsRepository){}

    async execute({slug}:GetQuestionBySlugUseCaseRequest):Promise<GetQuestionBySlugUseCaseResponse>{
        const question = await this.questionRepository.findBySlug(slug)

        if(!question){
            return left(new ResourceNotFoundError())
        }

        return right({
            question
        })
    }   
}