import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'


let InMemoryAnswersRepo: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch answer comments', () => {
    beforeEach(() => {
        InMemoryAnswersRepo = new InMemoryAnswersRepository()
        sut = new FetchQuestionAnswersUseCase(InMemoryAnswersRepo)
    })

    it(' should be able to fetch answer comments', async () => {
        await InMemoryAnswersRepo.create(
            makeAnswer({
                questionId: new UniqueEntityId('questions-id')
            })
        )

        await InMemoryAnswersRepo.create(
            makeAnswer({
                questionId: new UniqueEntityId('questions-id')
            })
        )

        await InMemoryAnswersRepo.create(
            makeAnswer({
                questionId: new UniqueEntityId('questions-id')
            })
        )

        const result = await sut.execute({
            questionId: 'questions-id',
            page: 1
        })

        expect(result.value?.answer).toHaveLength(3)
    })

    it(' should be able to fetch paginated question answers', async () => {

        for (let i = 1; i < 22; i++) {
            await InMemoryAnswersRepo.create(
                makeAnswer({
                    questionId: new UniqueEntityId('question-id')
                }),
            )
        }
        
        const result = await sut.execute({
            questionId: 'question-id',
            page: 1
        })

        expect(result.value?.answer).toHaveLength(20)
    })



})
