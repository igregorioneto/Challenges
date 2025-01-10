import { Menu } from "../entity/menu";

export interface MenuGateway {
    save(menu: Menu): Promise<void>;
    list(): Promise<Menu[]>;
}