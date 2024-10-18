import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './Errors/not-allowed-error'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerAttachments: InMemoryAnswerAttachmentRepository
let inMemoryRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit a question', () => {
    beforeEach(() => {
        inMemoryAnswerAttachments = new InMemoryAnswerAttachmentRepository()
        inMemoryRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachments)
        sut = new EditAnswerUseCase(inMemoryRepository, inMemoryAnswerAttachments)
    })

    it(' should be able to edit a question', async () => {

        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityId('author-1')
            },
            new UniqueEntityId('answer-1')
        )

        await inMemoryRepository.create(newAnswer)

        inMemoryAnswerAttachments.items.push(
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityId('1')
            }),
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityId('2')
            }),
        )

        await sut.execute({
            authorId: 'author-1',
            content: 'This is the content of the questions',
            answerId: newAnswer.id.toString(),
            attachmentsIds: ['1', '3']
        })

        expect(inMemoryRepository.items[0]).toMatchObject({
            content: 'This is the content of the questions',
            
        })
        expect(inMemoryRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
            expect.objectContaining({attachmentId: new UniqueEntityId('3')})
        ])
    })

    it(' should not be able to edit a question from another user', async () => {

        const newQuestion = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)

        const result = await sut.execute({
            authorId: 'author-2',
            content: '',
            answerId: newQuestion.id.toString(),
            attachmentsIds:[]
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
