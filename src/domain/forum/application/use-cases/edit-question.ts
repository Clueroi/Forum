import { Either, left, right } from "src/core/either"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"
import { NotAllowedError } from "./Errors/not-allowed-error"


interface EditQuestionUseCaseRequest {
    authorId:string
    title:string
    content:string
    questionId:string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question:Question
}> 


export class EditQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }


    async execute({
        authorId,
        questionId,
        title, 
        content
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        
        const question = await this.questionRepository.findById(questionId)

        if(!question){
            return left(new ResourceNotFoundError())
        }

        if(authorId !== question.authorId.toString()){
            return left(new ResourceNotFoundError())
        }

        question.title = title
        question.content = content

        await this.questionRepository.save(question)

        return right({
            question
        })
    }
}