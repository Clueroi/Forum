import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Answer } from "../../enterpriste/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"
import { Either, right } from "src/core/either"
import { AnswerAttachment } from "../../enterpriste/entities/answer-attachment"
import { AnswerAttachmentList } from "../../enterpriste/entities/answer-attachment-list"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    attachmentsIds: string[]
    content: string
}

type AnswerQuestionUseCaseResponse = Either<null,   {
    answer: Answer
}> 


export class AnswerQuestionUseCase {

    constructor(private answersRepository: AnswerRepository) { }


    async execute({
        instructorId,
        questionId,
        content,
        attachmentsIds
    }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {

        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId),
        })

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                answerId: answer.id
            })
        })

        answer.attachment = new AnswerAttachmentList(answerAttachments)

        await this.answersRepository.create(answer)

        return right({
            answer
        })
    }
}