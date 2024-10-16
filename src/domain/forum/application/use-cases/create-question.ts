import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { Either, right } from "src/core/either"
import { QuestionAttachment } from "../../enterpriste/entities/question-attachment"


interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
    attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<null, {
    question: Question
}>


export class CreateQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }


    async execute({
        authorId,
        title,
        content,
        attachmentsIds
    }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content,
        })

        const questionAttachments = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                questionId: question.id 
            })
        })

        question.attachments = questionAttachments

        await this.questionRepository.create(question)

        return right({
            question
        })
    }
}