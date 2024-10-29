import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { QuestionBestAnswerEvent } from "@/domain/forum/enterpriste/events/question-best-answer-event";

export class OnQuestionBestAnswer implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerEvent.name
    )
  }

  private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerEvent) {
    const answer = await this.answerRepository.findById(
      bestAnswerId.toString()
    )

    if(answer){
      await this.sendNotification.execute({
        recipientId:answer.authorId.toString(),
        title: `Sua resposta foi escolhida`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" , foi escolhida pelo autor`
      })
    }
  }
}