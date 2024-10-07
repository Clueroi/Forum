import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"


interface DeleteAnswerUseCaseRequest {
    authorId:string
    answerId:string
}

interface DeleteAnswerUseCaseResponse {
    answer:Answer
}


export class DeleteAnswerUseCase {

    constructor(private answerRepository: AnswerRepository) { }


    async execute({
        authorId,
        answerId
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            throw new Error('Answer not found')
        }

        if(authorId !== answer.authorId.toString()){
            throw new Error('Not Allowed')
        }

        await this.answerRepository.delete(answer)

        return {
            answer
        }
    }
}