import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Either, left, right } from "src/core/either"
import { Notification } from "../../enterprise/entities/notification"
import { NotificationRepository } from "../repositories/notification-repository"
import { ResourceNotFoundError } from "@/core/errors/Errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error"



interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
  notification: Notification
}>


export class ReadNotificationUseCase {

  constructor(private notificationRepository: NotificationRepository) { }


  async execute({
    notificationId,
    recipientId
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

    const notification = await this.notificationRepository.findByid(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()){
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({
      notification
    })

  }
}