import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'


let inMemoryRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question', ()=>{
    beforeEach(()=>{
        inMemoryRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestionUseCase(inMemoryRepository)
    })

    it(' should be able to create a question', async ()=>{
        
        const result = await sut.execute({
            authorId:'1',
            content:'Bla bla bla',
            title:'This is the title of the questions'
        })
    
        expect(result.isRight()).toBe(true)
        expect(inMemoryRepository.items[0]).toEqual(result.value?.question)
    })
})
