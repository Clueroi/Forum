import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterpriste/entities/answer'

const fakeAnswerRepository:AnswerRepository = {
    create: async (answer:Answer)=>{
        return
    }
}

test('test an answer', async ()=>{
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
    
    const answer = await answerQuestion.execute({
        questionId:'1',
        instructorId:'1',
        content:'Nova Resposta'
    })

    expect(answer.content).toEqual('Nova Resposta')
})