import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { AnswerRepository } from "../repositories/answer-repository"
import { AnswerCommentRepository } from "../repositories/answer-comment-repository"
import { AnswerComment } from "../../enterpriste/entities/answer-comment"


interface AnswerOnCommentUseCaseRequest {
    authorId: string
    answerId:string
    content:string
}

interface AnswerOnCommentUseCaseResponse {
    answerComment: AnswerComment
}


export class AnswerOnCommentUseCase {

    constructor(
        private answerRepository: AnswerRepository,
        private answerComment: AnswerCommentRepository
    ) { }


    async execute({
        authorId,
        answerId,
        content
    }: AnswerOnCommentUseCaseRequest): Promise<AnswerOnCommentUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            throw new Error('Question does not exists')
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId),
            content,
            answerId: new UniqueEntityId(answerId)
        })

        await this.answerComment.create(answerComment)

        return {
            answerComment
        }
    }
}