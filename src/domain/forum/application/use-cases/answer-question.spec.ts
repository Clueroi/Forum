import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterpriste/entities/answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryRepository: InMemoryAnswersRepository
let sut:AnswerQuestionUseCase

describe('Create an answer',()=>{
    
    beforeEach(()=>{
        inMemoryRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestionUseCase(inMemoryRepository)
    })

    it(' should be able to create an answer', async ()=>{
        
        const result = await sut.execute({
            questionId:'1',
            instructorId:'1',
            content:'Nova Resposta'
        })
    
        expect(result.isRight()).toBe(true)
        expect(inMemoryRepository.items[0]).toEqual(result.value?.answer)
    })
})
