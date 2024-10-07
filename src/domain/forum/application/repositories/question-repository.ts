import { Question } from "../../enterpriste/entities/question";


export interface QuestionsRepository{
    create(question: Question):Promise<void>
    findBySlug(slug:string):Promise<Question | null>
}