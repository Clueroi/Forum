import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerComment } from 'test/repositories/in-memory-answer-comment-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'


let InMemoryAnswerCommentRepository: InMemoryAnswerComment
let sut: DeleteAnswerCommentUseCase

describe('Delete Comment on answer', () => {
    beforeEach(() => {
        InMemoryAnswerCommentRepository = new InMemoryAnswerComment()
        sut = new DeleteAnswerCommentUseCase(InMemoryAnswerCommentRepository)
    })

    it(' should be able to delete a comment on answer', async () => {

        const answerComment = makeAnswerComment()

        await InMemoryAnswerCommentRepository.create(answerComment)

        await sut.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: answerComment.authorId.toString()
        })

        expect(InMemoryAnswerCommentRepository.items).toHaveLength(0)
    })

    it(' should not be able to delete another user comment on answer', async () => {

        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityId('Author-1')
        })

        await InMemoryAnswerCommentRepository.create(answerComment)

        await expect(() => 
            sut.execute({
                answerCommentId: answerComment.id.toString(),
                authorId: 'author-2'
            })

        ).rejects.toBeInstanceOf(Error)
    })
})
