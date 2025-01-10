import { Menu } from "../../../domain/menu/entity/menu";
import { MenuGateway } from "../../../domain/menu/gateway/menu.gateway";
import { Usecase } from "../../usecase";

export type MenuSaveInputDto = {
    title: string;
    path: string;
    icon: string;
}

export type MenuSaveOutputDto = {
    id: string;
}

export class MenuSaveUsecase implements Usecase<MenuSaveInputDto, MenuSaveOutputDto> {
    private constructor(private readonly menuGateway: MenuGateway) { }

    public static create(menuGateway: MenuGateway) {
        return new MenuSaveUsecase(menuGateway);
    }

    async execute({ title, path, icon }: MenuSaveInputDto): Promise<MenuSaveOutputDto> {
        const item = Menu.create(title, path, icon);

        await this.menuGateway.save(item);

        const output = this.presentOutput(item);
        return output;
    }

    private presentOutput(item: Menu) {
        const response: MenuSaveOutputDto = {
            id: item.id
        }
        return response;
    }

}