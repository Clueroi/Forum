import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachment-repository"
import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository"
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository"
import { SendNotificationUseCase } from "../use-cases/send-notification"
import { InMemoryNotificationsRepository } from "test/repositories/notification/in-memory-notifications-repository"
import { makeQuestion } from "test/factories/make-question"
import { MockInstance } from "vitest"
import { waitFor } from "test/utils/wait-for"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository : InMemoryQuestionRepository

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sut :SendNotificationUseCase

let sendNotificationExecuteSpy:MockInstance

describe('On answer created', () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)

    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sut = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    )

    sendNotificationExecuteSpy = vi.spyOn(sut, 'execute')

    new OnAnswerCreated(
      inMemoryQuestionRepository,
      sut)
  })

  it('Should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    }, )

    inMemoryQuestionRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(()=>{
    expect(sendNotificationExecuteSpy).toHaveBeenCalled()
      
    }) 

  })
})