import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { NotAllowedError } from './Errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'


let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase

describe('Edit a question', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository)

        sut = new EditQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionAttachmentRepository)
    })

    it(' should be able to edit a question', async () => {

        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityId('author-1')
            },
            new UniqueEntityId('question-1')
        )

        await inMemoryQuestionRepository.create(newQuestion)

        inMemoryQuestionAttachmentRepository.items.push(
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityId('1')
            }),
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityId('2')
            }),
        )

        await sut.execute({
            authorId: 'author-1',
            content: 'This is the content of the questions',
            title: 'New title new title',
            questionId: newQuestion.id.toString(),
            attachmentsIds:['1', '3']
        })

        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            title: 'New title new title',
            content: 'This is the content of the questions',

        })
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
            expect.objectContaining({attachmentId: new UniqueEntityId('3')})
        ])
    })

    it(' should not be able to edit a question from another user', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryQuestionRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'author-2',
            content: '',
            title: '',
            attachmentsIds: []
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
