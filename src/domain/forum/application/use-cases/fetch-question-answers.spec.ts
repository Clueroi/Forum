import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'


let inMemoryRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        sut = new FetchQuestionAnswersUseCase(inMemoryRepository)
    })

    it(' should be able to fetch recent questions', async () => {

        await inMemoryRepository.create(makeAnswer({
            questionId: new UniqueEntityId('question-1')
        }))
        await inMemoryRepository.create(makeAnswer({
            questionId: new UniqueEntityId('question-1')
        }))
        await inMemoryRepository.create(makeAnswer({
            questionId: new UniqueEntityId('question-1')
        }))
        

        const { answer } = await sut.execute({
            questionId:'question-1',
            page:1
        })

        expect(answer).toHaveLength(3)
    })

    it(' should be able to fetch paginated question answers', async () => {

        for (let i = 0; i < 22; i++) {
            await inMemoryRepository.create(
                makeAnswer()
            )
        }

        const { answer } = await sut.execute({
            questionId:'question-1',
            page: 2
        })

        expect(answer).toHaveLength(2)
    })

})
