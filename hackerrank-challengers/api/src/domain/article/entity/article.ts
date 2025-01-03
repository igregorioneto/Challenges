export type ArticleProps = {
    id: string;
    title: string;
    upvotes: number;
    date: number;
};

export class Article {
    private constructor(private props: ArticleProps) {}

    public static create(title: string, upvotes: number) {
        return new Article({
            id: crypto.randomUUID().toString(),
            title,
            upvotes,
            date: Date.now()
        });
    }

    public static with(props: ArticleProps) {
        return new Article(props);
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

    public get date() {
        return this.props.date;
    }
}