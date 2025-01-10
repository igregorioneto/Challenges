import { Menu } from "../../../domain/menu/entity/menu";
import { MenuGateway } from "../../../domain/menu/gateway/menu.gateway";
import { Usecase } from "../../usecase";

export type MenuSaveInLotInputDto = {
    lot: {
        title: string;
        path: string;
        icon: string;
    }[];
}

export type MenuSaveInLotOutputDto = {
    ids: {
        id: string;
    }[];
}

export class MenuSaveInLotUsecase implements Usecase<MenuSaveInLotInputDto, MenuSaveInLotOutputDto> {
    private constructor(private readonly menuGateway: MenuGateway) { }

    public static create(menuGateway: MenuGateway) {
        return new MenuSaveInLotUsecase(menuGateway);
    }

    async execute(input: MenuSaveInLotInputDto): Promise<MenuSaveInLotOutputDto> {
        const response: MenuSaveInLotOutputDto = { ids: [] };
        for (const { title, path, icon } of input.lot) {
            const item = Menu.create(title, path, icon);

            await this.menuGateway.save(item);
            
            response.ids.push(this.presentOutput(item));
        }
        return response;
    }

    private presentOutput(item: Menu) {
        return { id: item.id };
    }

}