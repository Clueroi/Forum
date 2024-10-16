import { Entity } from "src/core/entities/entity"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

export interface CommentProps {
    questionId: UniqueEntityId
    authorId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {

    get questionId(){
        return this.props.questionId
    }

    get authorId() {
        return this.props.authorId
    }

    get content() {
        return this.props.content
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

}