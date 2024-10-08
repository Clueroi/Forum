import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"


interface EditAnswerUseCaseRequest {
    authorId:string
    answerId:string
    content:string
}

interface EditAnswerUseCaseResponse {
    answer:Answer
}


export class EditAnswerUseCase {

    constructor(private answersRepository: AnswerRepository) { }


    async execute({
        authorId,
        answerId,
        content
    }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        
        const answer = await this.answersRepository.findById(answerId)

        if(!answer){
            throw new Error('Question not found')
        }

        if(authorId !== answer.authorId.toString()){
            throw new Error('Not Allowed')
        }

        answer.content = content

        await this.answersRepository.save(answer)

        return {
            answer
        }
    }
}