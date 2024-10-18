import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'


let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions ', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository)
        sut = new FetchRecentQuestionsUseCase(inMemoryRepository)
    })

    it(' should be able to fetch  recent questions', async () => {

        await inMemoryRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }))
        await inMemoryRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 16) }))
        await inMemoryRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 19) }))

        const result = await sut.execute({
            page: 1
        })

        expect(result.value?.question).toEqual([
            expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 19) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 16) }),
        ])
    })

    it(' should be able to fetch paginated recent questions', async () => {

        for (let i = 0; i < 22; i++) {
            await inMemoryRepository.create(
                makeQuestion()
            )
        }

        const result = await sut.execute({
            page: 2
        })

        expect(result.value?.question).toHaveLength(2)
    })

})