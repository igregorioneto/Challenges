export type ContactProps = {
    id: string;
    name: string;
    email: string;
    message: string;
}

export class Contact {
    private constructor(private props: ContactProps) { }

    public static create(name: string, email: string, message: string) {
        return new Contact({
            id: crypto.randomUUID().toString(),
            name,
            email,
            message
        });
    }

    public static with(props: ContactProps) {
        return new Contact(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get email() {
        return this.props.email;
    }

    public get message() {
        return this.props.message;
    }
}