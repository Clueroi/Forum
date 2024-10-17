import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { NotAllowedError } from './Errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete a question', ()=>{
    beforeEach(()=>{
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository)
        sut = new DeleteQuestionUseCase(inMemoryRepository)
    })

    it(' should be able to delete a question', async ()=>{

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)

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
            questionId: 'question-1',
            authorId:'author-1'
        })

        expect(inMemoryRepository.items).toHaveLength(0)
        expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(0)
    })

    it(' should not be able to delete a question from another user', async ()=>{

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: 'question-1',
            authorId:'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
