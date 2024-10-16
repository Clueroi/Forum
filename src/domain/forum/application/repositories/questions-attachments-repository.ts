import { QuestionAttachment } from "../../enterpriste/entities/question-attachment";

export interface QuestionAttachmentRepository {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}   