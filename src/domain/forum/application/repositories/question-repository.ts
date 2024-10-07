import { Question } from "../../enterpriste/entities/question";


export interface QuestionsRepository{
    create(question: Question):Promise<void>
}