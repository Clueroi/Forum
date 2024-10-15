import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './Errors/not-allowed-error'


let inMemoryRepositoryAnswers: InMemoryAnswersRepository
let inMemoryRepositoryQuestions: InMemoryQuestionRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer', ()=>{
    beforeEach(()=>{
        inMemoryRepositoryAnswers = new InMemoryAnswersRepository()
        inMemoryRepositoryQuestions = new InMemoryQuestionRepository()
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryRepositoryAnswers, inMemoryRepositoryQuestions)
    })

    it(' should be able to choose question best answer', async ()=>{

        const question = makeQuestion()

        const answer = makeAnswer({
            questionId:question.id
        })

        await inMemoryRepositoryQuestions.create(question)
        await inMemoryRepositoryAnswers.create(answer)
        
        await sut.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString()
        })

        expect(inMemoryRepositoryQuestions.items[0].bestAnswerId).toEqual(answer.id)
    })

    it(' should not be able to choose another user question best answer', async ()=>{

        const question = makeQuestion({
            authorId: new UniqueEntityId('author-01')
        })

        const answer = makeAnswer({
            questionId:question.id
        })

        await inMemoryRepositoryQuestions.create(question)
        await inMemoryRepositoryAnswers.create(answer)
        
        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId:'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
