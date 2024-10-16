import { PaginationParams } from "src/core/repositories/pagination-params";
import { Question } from "../../enterpriste/entities/question";


export interface QuestionsRepository {
    findManyRecent(page:PaginationParams):Promise<Question[]>
    findBySlug(slug: string): Promise<Question | null>
    findById(id:string):Promise<Question | null>
    create(question: Question): Promise<void>
    delete(question: Question): Promise<void>
    save(question:Question):Promise<void>
}