import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { QuestionsRepository } from "../repositories/question-repository"
import { QuestionComment } from "../../enterpriste/entities/question-comment"
import { questionCommentRepository } from "../repositories/question-comment-repository"


interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId:string
    content:string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}


export class CommentOnQuestionOnQuesttUseCase {

    constructor(
        private questionRepository: QuestionsRepository,
        private questionComment: questionCommentRepository
    ) { }


    async execute({
        authorId,
        questionId,
        content
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if(!question){
            throw new Error('Question does not exists')
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId),
            content,
            questionId: new UniqueEntityId(questionId)
        })

        await this.questionComment.create(questionComment)

        return {
            questionComment
        }
    }
}