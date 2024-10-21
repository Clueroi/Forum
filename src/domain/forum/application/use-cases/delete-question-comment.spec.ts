import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { InMemoryQuestionComment } from 'test/repositories/in-memory-question-comment-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/Errors/not-allowed-error'


let InMemoryQuestionCommentRepository: InMemoryQuestionComment
let sut: DeleteQuestionCommentUseCase

describe('Delete Comment on question', () => {
    beforeEach(() => {
        InMemoryQuestionCommentRepository = new InMemoryQuestionComment()
        sut = new DeleteQuestionCommentUseCase(InMemoryQuestionCommentRepository)
    })

    it(' should be able to delete a comment on question', async () => {

        const questionComment = makeQuestionComment()

        await InMemoryQuestionCommentRepository.create(questionComment)

        await sut.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: questionComment.authorId.toString()
        })

        expect(InMemoryQuestionCommentRepository.items).toHaveLength(0)
    })

    it(' should not be able to delete another user comment on question', async () => {

        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityId('Author-1')
        })

        await InMemoryQuestionCommentRepository.create(questionComment)

        const result = await sut.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: 'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
