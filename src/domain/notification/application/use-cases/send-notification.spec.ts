import { InMemoryNotificationsRepository } from "test/repositories/notification/in-memory-notifications-repository"
import { SendNotificationUseCase } from "./send-notification"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase


describe('Send nofification', () => {

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Should be able to send a notification', async () => {

    const result = await sut.execute({
      title: 'Notification Title',
      content: 'Notification Content',
      recipientId: '1'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification)

  })
})