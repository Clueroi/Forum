import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { AnswerRepository } from "../repositories/answer-repository"
import { AnswerCommentRepository } from "../repositories/answer-comment-repository"
import { AnswerComment } from "../../enterpriste/entities/answer-comment"
import { Either, left, right } from "src/core/either"
import { ResourceNotFoundError } from "./Errors/resource-not-found-error"


interface AnswerOnCommentUseCaseRequest {
    authorId: string
    answerId:string
    content:string
    questionId:string
}

type AnswerOnCommentUseCaseResponse = Either<ResourceNotFoundError, {
    answerComment: AnswerComment
}>


export class AnswerOnCommentUseCase {

    constructor(
        private answerRepository: AnswerRepository,
        private answerComment: AnswerCommentRepository
    ) { }


    async execute({
        authorId,
        answerId,
        content,
        questionId
    }: AnswerOnCommentUseCaseRequest): Promise<AnswerOnCommentUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            return left(new ResourceNotFoundError())
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
            content,
            questionId: new UniqueEntityId(questionId)
        })

        await this.answerComment.create(answerComment)

        return right({
            answerComment
        })
    }
}