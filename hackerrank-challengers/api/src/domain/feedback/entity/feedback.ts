export type FeedbackProps = {
    id: string;
    title: string;
    upvotes: number;
    downvotes: number;
}

export class Feedback {
    private constructor(private props: FeedbackProps) {}

    public static create(title: string) {
        return new Feedback({
            id: crypto.randomUUID().toString(),
            title,
            upvotes: 0,
            downvotes: 0
        })
    }

    public static with(props: FeedbackProps) {
        return new Feedback(props);
    }

    public get id() {
        return this.props.id;
    }

    public get title() {
        return this.props.title;
    }

    public get upvotes() {
        return this.props.upvotes;
    }

    public get downvotes() {
        return this.props.downvotes;
    }

    public increaseUpvotes() {
        this.props.upvotes += 1;
    }

    public increaseDownvotes() {
        this.props.downvotes += 1;
    }

}