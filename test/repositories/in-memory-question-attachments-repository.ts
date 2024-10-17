import { QuestionAttachmentRepository } from "src/domain/forum/application/repositories/questions-attachments-repository"
import { QuestionAttachment } from "src/domain/forum/enterpriste/entities/question-attachment"


export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentRepository {
    public items: QuestionAttachment[] = []

    async findManyByQuestionId(questionId: string) {
        const questionAttachments = this.items.filter(
            (item) => item.questionId.toString() === questionId
        )

        return questionAttachments
    }

}