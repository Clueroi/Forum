import { Notification, NotificationProps } from '@/domain/notification/enterprise/entities/notification';
import { faker } from '@faker-js/faker'


import { UniqueEntityId } from "src/core/entities/unique-entity-id";


export function makeNotification(override: Partial<NotificationProps> = {}, id?: UniqueEntityId) {
    const question = Notification.create({
        recipientId: new UniqueEntityId(),
        title: faker.lorem.sentence(4),
        content: faker.lorem.sentence(10),
        ...override
    },
        id
    )

    return question
}