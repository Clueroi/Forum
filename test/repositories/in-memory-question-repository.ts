import { QuestionsRepository } from "src/domain/forum/application/repositories/question-repository";
import { Question } from "src/domain/forum/enterpriste/entities/question";

export class InMemoryQuestionRepository implements QuestionsRepository{
    public items:Question[] = []


    async findBySlug(slug: string) {
        const questions = this.items.find(item => item.slug.value === slug)

        if(!questions){
            return null
        }

        return questions
    }


    async create(question: Question){
        this.items.push(question)
    }
    
}