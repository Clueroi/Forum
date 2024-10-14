import { Either, left, right } from "src/core/either"
import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"
import { NotAllowedError } from "./Errors/not-allowed-error"


interface DeleteAnswerUseCaseRequest {
    authorId:string
    answerId:string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer:Answer
}>


export class DeleteAnswerUseCase {

    constructor(private answerRepository: AnswerRepository) { }


    async execute({
        authorId,
        answerId
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
           return left(new ResourceNotFoundError())
        }

        if(authorId !== answer.authorId.toString()){
            return left(new NotAllowedError())
        }

        await this.answerRepository.delete(answer)

        return right({
            answer
        })
    }
}