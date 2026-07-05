import Question from "./question";

export default class Subject {
    description: string;
    numberOfQuestions: number;
    questions: Question[] = [];

    constructor(description: string, numberOfQuestions: number, questions: Question[] = []) {
        this.description = description;
        this.numberOfQuestions = numberOfQuestions;
        this.questions = questions;
    }
}