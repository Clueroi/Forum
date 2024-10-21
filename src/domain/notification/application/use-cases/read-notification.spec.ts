import { InMemoryNotificationsRepository } from "test/repositories/notification/in-memory-notifications-repository"
import { ReadNotificationUseCase } from "./read-notification"
import { makeNotification } from "test/factories/make-notification"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase


describe('Read the Notification', () => {

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Should be able to read a notification', async () => {

    const notification = makeNotification()

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date)
    )
  })

  it('Should not be able to read another user notification', async () => {
    
    const notification = makeNotification({
      recipientId: new UniqueEntityId('recipient-1')
    })

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
  })

})