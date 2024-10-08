import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { title } from 'process'


let inMemoryRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit a question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryRepository)
    })

    it(' should be able to edit a question', async () => {

        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityId('author-1')
            },
            new UniqueEntityId('question-1')
        )

        await inMemoryRepository.create(newQuestion)

        await sut.execute({
            authorId: 'author-1',
            content: 'This is the content of the questions',
            title: 'New title new title',
            questionId: newQuestion.id.toString()
        })

        expect(inMemoryRepository.items[0]).toMatchObject({
            title: 'New title new title',
            content: 'This is the content of the questions',

        })
    })

    it(' should not be able to edit a question from another user', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)

        expect(async () =>
            await sut.execute({
                questionId: newQuestion.id.toString(),
                authorId: 'author-2',
                content: '',
                title: ''
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
