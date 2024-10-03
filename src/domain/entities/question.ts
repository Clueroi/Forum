import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface QuestionProps{
    title:string
    content:string
    authorId:UniqueEntityId
    slug: Slug
}

export class Question extends Entity<QuestionProps>{

}