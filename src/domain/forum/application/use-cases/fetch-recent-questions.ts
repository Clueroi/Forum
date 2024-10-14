import { Either, left, right } from "src/core/either"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"

interface FetchRecentQuestionsUseCaseRequest{
    page:number
}

type FetchRecentQuestionsUseCaseResponse = Either<ResourceNotFoundError, {
    question:Question[]
}>


export class FetchRecentQuestionsUseCase{
    constructor(private questionRepository: QuestionsRepository){}

    async execute({page}:FetchRecentQuestionsUseCaseRequest):Promise<FetchRecentQuestionsUseCaseResponse>{
        const question = await this.questionRepository.findManyRecent({page})

        if(!question){
            return left(new ResourceNotFoundError)
        }

        return right({
            question
        })
    }   
}