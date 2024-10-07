import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterpriste/entities/question'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'


let inMemoryRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question', ()=>{
    beforeEach(()=>{
        inMemoryRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestionUseCase(inMemoryRepository)
    })

    it(' should be able to create n question', async ()=>{
        
        const { question } = await sut.execute({
            authorId:'1',
            content:'Bla bla bla',
            title:'This is the title of the questions'
        })
    
        expect(question.id).toBeTruthy()
        expect(inMemoryRepository.items[0].id).toEqual(question.id)
    })
})
