import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Either, right } from "src/core/either"
import { Notification } from "../../enterprise/entities/notification"
import { NotificationRepository } from "../repositories/notification-repository"



interface SendNotificationUseCaseRequest {
    recipientId: string
    title: string
    content: string
}

type SendNotificationUseCaseResponse = Either<null, {
    notification: Notification
}>


export class SendNotificationUseCase {

    constructor(private notificationRepository: NotificationRepository) { }


    async execute({
      recipientId,
        title,
        content,
    }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
        const notification = Notification.create({
          recipientId: new UniqueEntityId(recipientId),
            title,
            content,
        })

        

        await this.notificationRepository.create(notification)

        return right({
            notification
        })
    }
}