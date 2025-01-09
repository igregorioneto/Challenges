import { Contact } from "../../../domain/contact/entity/contact";
import { ContactGateway } from "../../../domain/contact/gateway/contact.gateway";
import { Usecase } from "../../usecase";

export type ListContactInputDto = void;

export type ListContactOutputDto = {
    contacts: {
        id: string;
        name: string;
        email: string;
        message: string;
    }[];
}

export class ListContactUsecase implements Usecase<ListContactInputDto, ListContactOutputDto> {
    private constructor(private readonly contactGateway: ContactGateway) { }

    public static create(contactGateway: ContactGateway) {
        return new ListContactUsecase(contactGateway);
    }

    async execute(): Promise<ListContactOutputDto> {
        const contacts = await this.contactGateway.list();

        const output = this.presentContacts(contacts);
        return output;
    }    

    presentContacts(contacts: Contact[]) {
        return {
            contacts: contacts.map((c) => ({
                id: c.id,
                name: c.name,
                email: c.email,
                message: c.message
            }))
        }
    }
}