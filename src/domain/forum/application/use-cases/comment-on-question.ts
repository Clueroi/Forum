import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { QuestionsRepository } from "../repositories/question-repository"
import { QuestionComment } from "../../enterpriste/entities/question-comment"
import { questionCommentRepository } from "../repositories/question-comment-repository"
import { Either, left, right } from "src/core/either"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"


interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId:string
    content:string
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, {
    questionComment: QuestionComment
}>


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
            return left(new ResourceNotFoundError())
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId),
            content,
            questionId: new UniqueEntityId(questionId)
        })

        await this.questionComment.create(questionComment)

        return right({
            questionComment
        })
    }
}