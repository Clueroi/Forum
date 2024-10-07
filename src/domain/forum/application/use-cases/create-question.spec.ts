import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterpriste/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository:QuestionsRepository = {
    create: async (question:Question)=>{
        return
    }
}

test('test an question', async ()=>{
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
    
    const { question } = await createQuestion.execute({
        authorId:'1',
        content:'Bla bla bla',
        title:'This is the title of the questions'
    })

    expect(question.id).toBeTruthy()
})