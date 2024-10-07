import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterpriste/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterpriste/entities/value-objects/slug'


let inMemoryRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', ()=>{
    beforeEach(()=>{
        inMemoryRepository = new InMemoryQuestionRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryRepository)
    })

    it(' should be able to get a question by slug', async ()=>{

        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        })

        await inMemoryRepository.create(newQuestion)

        console.log(newQuestion)
        
        const { question } = await sut.execute({
            slug:'example-question'
        })
    
        expect(question.id).toBeTruthy()
    })
})
