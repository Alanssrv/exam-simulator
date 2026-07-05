export default class Option {
    optionId: number;
    description: string;

    constructor(optionId: number, description: string) {
        this.optionId = optionId;
        this.description = description;
    }
}