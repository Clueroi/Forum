import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterpriste/entities/question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterpriste/entities/value-objects/slug'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'


let inMemoryRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', ()=>{
    beforeEach(()=>{
        inMemoryRepository = new InMemoryQuestionRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryRepository)
    })

    it(' should be able to get a question by slug', async ()=>{

        const newQuestion = Question.create({
            title:'example question',
            slug: Slug.create('example-question'),
            authorId:new UniqueEntityId,
            content:'Content'
        })

        await inMemoryRepository.create(newQuestion)
        
        const { question } = await sut.execute({
            slug:'example-question'
        })
    
        expect(question.id).toBeTruthy()
    })
})
