import { Menu } from "../../../domain/menu/entity/menu";
import { MenuGateway } from "../../../domain/menu/gateway/menu.gateway";
import { Usecase } from "../../usecase";

export type MenuListInputDto = void;

export type MenuListOutputDto = {
    items: {
        id: string;
        title: string;
        path: string;
        icon: string;
    }[];
}

export class MenuListUsecase implements Usecase<MenuListInputDto, MenuListOutputDto> {
    private constructor(private readonly menuGateway: MenuGateway) { }

    public static create(menuGateway: MenuGateway) {
        return new MenuListUsecase(menuGateway);
    }

    async execute(input: MenuListInputDto): Promise<MenuListOutputDto> {
        const items = await this.menuGateway.list();

        const output = this.presentOutput(items);
        return output;
    }

    private presentOutput(items: Menu[]) {
        return {
            items: items.map((item) => ({
                id: item.id,
                title: item.title,
                path: item.path,
                icon: item.icon,
            }))
        }
    }

}