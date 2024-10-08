import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"

interface FetchRecentQuestionsUseCaseRequest{
    page:number
}

interface FetchRecentQuestionsUseCaseResponse{
    question:Question[]
}


export class FetchRecentQuestionsUseCase{
    constructor(private questionRepository: QuestionsRepository){}

    async execute({page}:FetchRecentQuestionsUseCaseRequest):Promise<FetchRecentQuestionsUseCaseResponse>{
        const question = await this.questionRepository.findManyRecent({page})

        if(!question){
            throw new Error('Question not found')
        }

        return {
            question
        }
    }   
}