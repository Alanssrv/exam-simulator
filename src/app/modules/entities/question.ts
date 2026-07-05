import Option from './option';

export default class Question {
    questionId: number;
    description: string;
    options: Option[];
    answerId: number;

    constructor(questionId: number, description: string, options: Option[], answerId: number) {
        this.questionId = questionId;
        this.description = description;
        this.options = options;
        this.answerId = answerId;
    }
}