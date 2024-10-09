import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { InMemoryQuestionComment } from 'test/repositories/in-memory-question-comment'
import { CommentOnQuestionOnQuesttUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'


let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryQuestionComment: InMemoryQuestionComment
let sut: CommentOnQuestionOnQuesttUseCase

describe('Comment on question', () => {
    beforeEach(() => {
        inMemoryQuestionComment = new InMemoryQuestionComment()
        inMemoryQuestionsRepository = new InMemoryQuestionRepository()
        sut = new CommentOnQuestionOnQuesttUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionComment
        )
    })

    it(' should be able to comment on questions', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: 'comentário teste'
        })

        expect(inMemoryQuestionComment.items[0].content).toEqual('comentário teste')
    })



})
