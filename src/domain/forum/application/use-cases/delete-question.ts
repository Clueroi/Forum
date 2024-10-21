import { Either, left, right } from "src/core/either"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { ResourceNotFoundError } from "@/core/errors/Errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error"


interface DeleteQuestionUseCaseRequest {
    authorId:string
    questionId:string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question:Question
}>


export class DeleteQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }


    async execute({
        authorId,
        questionId
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        
        const question = await this.questionRepository.findById(questionId)

        if(!question){
            return left(new ResourceNotFoundError())
        }

        if(authorId !== question.authorId.toString()){
            return left(new NotAllowedError())
        }

        await this.questionRepository.delete(question)

        return right({
            question
        })
    }
}