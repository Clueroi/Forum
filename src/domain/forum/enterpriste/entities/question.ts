import { Slug } from "./value-objects/slug"
import { Entity } from "src/core/entities/entity"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"
import dayjs from "dayjs"

interface QuestionProps {
    authorId: UniqueEntityId
    bestAnswerId?: string
    title: string
    content: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {

    get authorId() {
        return this.props.authorId
    }
    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    get title() {
        return this.props.title
    }

    get content() {
        return this.props.content
    }

    get slug() {
        return this.props.slug
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get isNew() {
        return dayjs().diff(this.createdAt, 'days') <= 3
    }

    get exercpt() {
        return this.content.substring(0, 120).trimEnd().concat('...')
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set bestAnswerId(bestAnswerId: string | undefined) {
        this.props.bestAnswerId = bestAnswerId
        this.touch()
    }

    static create(
        props: Optional<QuestionProps, 'createdAt' | 'slug'>,
        id?: UniqueEntityId,
    ) {
        const question = new Question(
            {
                ...props,
                slug: props.slug ?? Slug.createFromText(props.title),
                createdAt: new Date()
            }, id)

        return question
    }
}   