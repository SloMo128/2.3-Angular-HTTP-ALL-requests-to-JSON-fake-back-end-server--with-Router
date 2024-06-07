export class Feedback {
    feedbackType: string;
    feedbackMsg: string;

    constructor(feedbackType: string, feedbackMsg: string) {
        this.feedbackType = feedbackType,
        this.feedbackMsg = feedbackMsg
    }
}