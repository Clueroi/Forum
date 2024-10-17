import { AnswerAttachmentRepository } from "src/domain/forum/application/repositories/answer-attachment-repository"
import { AnswerAttachment } from "src/domain/forum/enterpriste/entities/answer-attachment"


export class InMemoryAnswerAttachmentRepository
    implements AnswerAttachmentRepository
    {

    public items: AnswerAttachment[] = []

    async findManyByAnswerId(answerId: string) {
        const answerAttachments = this.items.filter(
            (item) => item.answerId.toString() === answerId
        )

        return answerAttachments
    }

    async deleteManyByAnswerId(answerId: string) {
        const answerAttachments = this.items.filter(
            (item) => item.answerId.toString() !== answerId
        )

        this.items = answerAttachments
    }
}