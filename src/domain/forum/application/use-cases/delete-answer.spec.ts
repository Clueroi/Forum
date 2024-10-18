import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerAttachments: InMemoryAnswerAttachmentRepository
let inMemoryRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete a answer', ()=>{
    beforeEach(()=>{
        inMemoryAnswerAttachments = new InMemoryAnswerAttachmentRepository()
        inMemoryRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachments)
        sut = new DeleteAnswerUseCase(inMemoryRepository)
    })

    it(' should be able to delete a answer', async ()=>{

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'))

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
            answerId: 'answer-1',
            authorId:'author-1'
        })

        expect(inMemoryRepository.items).toHaveLength(0)
        expect(inMemoryAnswerAttachments.items).toHaveLength(0)
    })

    it(' should not be able to delete a answer from another user', async ()=>{

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'))

        await inMemoryRepository.create(newAnswer)

        const result = await sut.execute({
            answerId: 'answer-1',
            authorId:'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(Error)
    })
})
