import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'


let inMemoryRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete a question', ()=>{
    beforeEach(()=>{
        inMemoryRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryRepository)
    })

    it(' should be able to delete a question', async ()=>{

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)
        
        await sut.execute({
            questionId: 'question-1',
            authorId:'author-1'
        })

        expect(inMemoryRepository.items).toHaveLength(0)
    })

    it(' should not be able to delete a question from another user', async ()=>{

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))

        await inMemoryRepository.create(newQuestion)

        expect(async ()=>
            await sut.execute({
                questionId: 'question-1',
                authorId:'author-2'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
