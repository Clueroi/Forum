import { faker } from '@faker-js/faker'

import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from 'src/domain/forum/enterpriste/entities/answer-comment';

export function makeAnswerComment(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityId) {
    const answerComment = AnswerComment.create({
        answerId: new UniqueEntityId(),
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override
    },
        id
    )

    return answerComment
}