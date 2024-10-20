import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachment: InMemoryAnswerAttachmentRepository
let sut: AnswerQuestionUseCase

describe('Create an answer', () => {

	beforeEach(() => {
		inMemoryAnswerAttachment = new InMemoryAnswerAttachmentRepository()
		inMemoryRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachment)
		sut = new AnswerQuestionUseCase(inMemoryRepository)
	})

	it(' should be able to create an answer', async () => {

		const result = await sut.execute({
			questionId: '1',
			instructorId: '1',
			content: 'Nova Resposta',
			attachmentsIds: ['1', '2', '3']
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryRepository.items[0]).toEqual(result.value?.answer)
		expect(inMemoryRepository.items[0].attachments.currentItems).toHaveLength(3)
		expect(inMemoryRepository.items[0].attachments.currentItems).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('3') })
		])
	})
})
