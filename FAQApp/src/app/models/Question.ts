export class Question {
    text: string;
    answer: string;
    hide: boolean;

    constructor(text, answer, hide) {
        this.text = text;
        this.answer = answer;
        this.hide = hide;
    }
}
