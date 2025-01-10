import { PrismaClient } from "@prisma/client";
import { Menu } from "../../../domain/menu/entity/menu";
import { MenuGateway } from "../../../domain/menu/gateway/menu.gateway";

export class MenuRepositoryPrisma implements MenuGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new MenuRepositoryPrisma(prismaClient);
    }

    async save(menu: Menu): Promise<void> {
        const data = {
            id: menu.id,
            title: menu.title,
            path: menu.path,
            icon: menu.icon
        };

        await this.prismaClient.menu.create({ data });
    }

    async list(): Promise<Menu[]> {
        const menu = await this.prismaClient.menu.findMany();

        return menu.map((item) => {
            return Menu.with({
                id: item.id,
                title: item.title,
                path: item.path,
                icon: item.icon
            })
        })
    }
}