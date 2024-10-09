import { InMemoryQuestionComment } from 'test/repositories/in-memory-question-comment-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'


let inMemoryQuestionComment: InMemoryQuestionComment
let sut: FetchQuestionCommentsUseCase

describe('Fetch question comments', () => {
    beforeEach(() => {
        inMemoryQuestionComment = new InMemoryQuestionComment()
        sut = new FetchQuestionCommentsUseCase(
            inMemoryQuestionComment,
        )
    })

    it(' should be able to comment on questions', async () => {
        await inMemoryQuestionComment.create(
            makeQuestionComment({
                questionId: new UniqueEntityId('question-1')
            })
        )

        await inMemoryQuestionComment.create(
            makeQuestionComment({
                questionId: new UniqueEntityId('question-1')
            })
        )

        await inMemoryQuestionComment.create(
            makeQuestionComment({
                questionId: new UniqueEntityId('question-1')
            })
        )

        const { questionComments } = await sut.execute({
            questionId: 'question-1',
            page: 1
        })

        expect(questionComments).toHaveLength(3)
    })

    it(' should be able to fetch paginated recent questions', async () => {

        for (let i = 1; i < 22; i++) {
            await inMemoryQuestionComment.create(
                makeQuestionComment({
                    questionId: new UniqueEntityId('question-1')
                }),
            )
        }

        const { questionComments } = await sut.execute({
            questionId:'question-1',
            page: 2
        })

        expect(questionComments).toHaveLength(1)
    })



})
