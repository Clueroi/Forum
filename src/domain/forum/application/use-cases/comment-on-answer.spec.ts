import { InMemoryAnswerComment } from "test/repositories/in-memory-answer-comment-repository"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { AnswerOnCommentUseCase } from "./comment-on-answer"
import { makeAnswer } from "test/factories/make-answer"


let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerComment: InMemoryAnswerComment
let sut: AnswerOnCommentUseCase

describe('Comment on answer', () => {
    beforeEach(() => {
        inMemoryAnswerComment = new InMemoryAnswerComment()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerOnCommentUseCase(
            inMemoryAnswersRepository,
            inMemoryAnswerComment
        )
    })

    it(' should be able to comment on answers', async () => {
        const answer = makeAnswer()

        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            answerId:answer.id.toString(),
            authorId:answer.authorId.toString(),
            content:'comentário teste'
        })

        expect(inMemoryAnswerComment.items[0].content).toEqual('comentário teste')
    })



})
