    import { InMemoryAnswerComment } from 'test/repositories/in-memory-answer-comment-repository'
    import { FetchAnswerCommentsUseCase } from './fetch-answer-coments'
    import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
    import { makeAnswerComment } from 'test/factories/make-answer-comment'


    let inMemoryanswerComment: InMemoryAnswerComment
    let sut: FetchAnswerCommentsUseCase

    describe('Fetch answer comments', () => {
        beforeEach(() => {
            inMemoryanswerComment = new InMemoryAnswerComment()
            sut = new FetchAnswerCommentsUseCase(inMemoryanswerComment)
        })

        it(' should be able to fetch answer comments', async () => {
            await inMemoryanswerComment.create(
                makeAnswerComment({
                    answerId: new UniqueEntityId('answer-1'),
                })
            )

            await inMemoryanswerComment.create(
                makeAnswerComment({
                    answerId: new UniqueEntityId('answer-1')
                })
            )

            await inMemoryanswerComment.create(
                makeAnswerComment({
                    answerId: new UniqueEntityId('answer-1')
                })
            )

            const result = await sut.execute({
                answerId: 'answer-1',
                page: 1
            })

            expect(result.value?.answerComment).toHaveLength(3)
        })

        it(' should be able to fetch paginated recent answers', async () => {

            for (let i = 1; i < 22; i++) {
                await inMemoryanswerComment.create(
                    makeAnswerComment({
                        answerId: new UniqueEntityId('answer-1')
                    }),
                )
            }
            
            const result = await sut.execute({
                answerId: 'answer-1',
                page: 2
            })

            expect(result.value?.answerComment).toHaveLength(1)
        })



    })
