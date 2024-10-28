import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";
import { vi } from 'vitest'

class CustomAgreggateCreated implements DomainEvent {
  public ocurredAt: Date
  public aggregate: CustomAgreggate

  constructor(agreggate: CustomAgreggate) {
    this.aggregate = agreggate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id

  }

}

class CustomAgreggate extends AggregateRoot<null> {
  static create() {
    const agreggate = new CustomAgreggate(null)

    agreggate.addDomainEvent(new CustomAgreggateCreated(agreggate))

    return agreggate
  }
}


describe('Domain Events', () => {
  it('shold be able to dispatch and listen events', async () => {

    const callbackSpy = vi.fn()

    //  Subscriber cadastrado
    DomainEvents.register(callbackSpy, CustomAgreggateCreated.name)

    // Criando uma resposta porém sem salvar no banco
    const aggregate = CustomAgreggate.create()

    // Estou assegurando de que um evento foi criado, mas não disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})