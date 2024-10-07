import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Question, QuestionProps } from "src/domain/forum/enterpriste/entities/question";
import { Slug } from "src/domain/forum/enterpriste/entities/value-objects/slug";

export function makeQuestion(override:Partial<QuestionProps>={}) {
    const question = Question.create({
        title: 'example question',
        slug: Slug.create('example-question'),
        authorId: new UniqueEntityId(),
        content: 'Content',
        ...override
    })

    return question
}