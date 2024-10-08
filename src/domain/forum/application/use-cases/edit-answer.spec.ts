import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'


let inMemoryRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit a question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryRepository)
    })

    it(' should be able to edit a question', async () => {

        const newQuestion = makeAnswer(
            {
                authorId: new UniqueEntityId('author-1')
            },
            new UniqueEntityId('answer-1')
        )

        await inMemoryRepository.create(newQuestion)

        await sut.execute({
            authorId: 'author-1',
            content: 'This is the content of the questions',
            answerId: newQuestion.id.toString()
        })

        expect(inMemoryRepository.items[0]).toMatchObject({
            content: 'This is the content of the questions',

        })
    })

    it(' should not be able to edit a question from another user', async () => {

        const newQuestion = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)

        expect(async () =>
            await sut.execute({
                authorId: 'author-2',
                content: '',
                answerId: newQuestion.id.toString()
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
