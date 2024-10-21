import { NotificationRepository } from "@/domain/notification/application/repositories/notification-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository implements NotificationRepository{
  public items: Notification[] = []
  
  
  async findByid(id: string) {
    const notify = this.items.find((item) => item.id.toString() === id)

    if(!notify){
      return null
    }

    return notify
  }


  async save(notification: Notification){
    const notify = this.items.findIndex((item) => item.id === notification.id)

    this.items[notify] = notification

  }


  async create(notification: Notification) {
    this.items.push(notification)
  }
  
}