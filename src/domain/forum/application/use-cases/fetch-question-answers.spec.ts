import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryAnswerAttachments: InMemoryAnswerAttachmentRepository
let inMemoryRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch answer comments', () => {
    beforeEach(() => {
        inMemoryAnswerAttachments = new InMemoryAnswerAttachmentRepository()
        inMemoryRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachments)
        sut = new FetchQuestionAnswersUseCase(inMemoryRepository)
    })

    it(' should be able to fetch answer comments', async () => {
        await inMemoryRepository.create(
            makeAnswer({
                questionId: new UniqueEntityId('questions-id')
            })
        )

        await inMemoryRepository.create(
            makeAnswer({
                questionId: new UniqueEntityId('questions-id')
            })
        )

        await inMemoryRepository.create(
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
            await inMemoryRepository.create(
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
