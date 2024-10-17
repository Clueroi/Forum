import { Either, left, right } from "src/core/either"
import { Question } from "../../enterpriste/entities/question"
import { QuestionsRepository } from "../repositories/question-repository"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"
import { NotAllowedError } from "./Errors/not-allowed-error"
import { QuestionAttachmentRepository } from "../repositories/questions-attachments-repository"
import { QuestionAttachmentList } from "../../enterpriste/entities/question-attachment-list"
import { QuestionAttachment } from "../../enterpriste/entities/question-attachment"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"


interface EditQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
    questionId: string
    attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question
}>


export class EditQuestionUseCase {

    constructor(
        private questionRepository: QuestionsRepository,
        private attachmentRepository: QuestionAttachmentRepository
    ) { }


    async execute({
        authorId,
        questionId,
        title,
        content,
        attachmentsIds
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.attachmentRepository.findManyByQuestionId(questionId)

        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachments = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                questionId: question.id
            })
        })  

        questionAttachmentList.update(questionAttachments)

        question.attachments = questionAttachmentList
        question.title = title
        question.content = content

        await this.questionRepository.save(question)

        return right({
            question
        })
    }
}