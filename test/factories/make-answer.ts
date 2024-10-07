import { faker } from '@faker-js/faker'


import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Answer, AnswerProps } from 'src/domain/forum/enterpriste/entities/answer';

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityId) {
    const question = Answer.create({
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override
    },
        id
    )

    return question
}