import { randomUUID } from "crypto";

export type MenuProps = {
    id: string;
    title: string;
    path: string;
    icon: string;
}

export class Menu {
    private constructor(private props: MenuProps) {}

    public static create(title: string, path: string, icon: string) {
        return new Menu({
            id: randomUUID().toString(),
            title,
            path,
            icon
        });
    }

    public static with(props: MenuProps) {
        return new Menu(props);
    }

    public get id() {
        return this.props.id;
    }

    public get title() {
        return this.props.title;
    }

    public get path() {
        return this.props.path;
    }

    public get icon() {
        return this.props.icon;
    }
}