import { Feedback } from "../entity/feedback";

export interface FeedbackGatway {
    save(feedback: Feedback): Promise<void>;
    list(): Promise<Feedback[]>;
    increaseUpvotes(): Promise<void>;
    increaseDownvotes(): Promise<void>;
}