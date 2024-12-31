import { Feedback } from "../entity/feedback";

export interface FeedbackGatway {
    save(feedback: Feedback): Promise<void>;
    list(): Promise<Feedback[]>;
    getById(id: string): Promise<Feedback | null>;
    increaseUpvotes(feedback: Feedback): Promise<void>;
    increaseDownvotes(feedback: Feedback): Promise<void>;
}