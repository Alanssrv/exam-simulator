import Question from "./question";

export default class Subject {
    description: string;
    questions: Question[] = [];

    constructor(description: string, questions: Question[] = []) {
        this.description = description;
        this.questions = questions;
    }
}