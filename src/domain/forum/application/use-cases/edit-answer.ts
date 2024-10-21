import { Either, left, right } from "src/core/either"
import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"
import { ResourceNotFoundError } from "@/core/errors/Errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { AnswerAttachment } from "../../enterpriste/entities/answer-attachment"
import { AnswerAttachmentList } from "../../enterpriste/entities/answer-attachment-list"
import { AnswerAttachmentRepository } from "../repositories/answer-attachment-repository"


interface EditAnswerUseCaseRequest {
    authorId:string
    answerId:string
    content:string
    attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer:Answer
}>


export class EditAnswerUseCase {

    constructor(
        private answersRepository: AnswerRepository,
        private attachmentRepository: AnswerAttachmentRepository
    ) { }


    async execute({
        authorId,
        answerId,
        content,
        attachmentsIds

    }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        
        const answer = await this.answersRepository.findById(answerId)

        if(!answer){
            return left(new ResourceNotFoundError())
        }

        if(authorId !== answer.authorId.toString()){
            return left(new NotAllowedError)
        }

        const currentAnswerAttachments = await this.attachmentRepository.findManyByAnswerId(answerId)

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                answerId: answer.id
            })
        })  

        answerAttachmentList.update(answerAttachments)

        answer.attachment = answerAttachmentList

        answer.content = content

        await this.answersRepository.save(answer)

        return right({
            answer
        })
    }
}