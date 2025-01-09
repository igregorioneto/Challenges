import { Contact } from "../../../domain/contact/entity/contact";
import { ContactGateway } from "../../../domain/contact/gateway/contact.gateway";
import { Usecase } from "../../usecase";

export type SaveContactInputDto = {
    name: string;
    email: string;
    message: string;
}

export type SaveContactOutputDto = {
    id: string;
}

export class SaveContactUsecase implements Usecase<SaveContactInputDto, SaveContactOutputDto> {
    private constructor(private readonly contactGateway: ContactGateway) { }

    public static create(contactGateway: ContactGateway) {
        return new SaveContactUsecase(contactGateway);
    }

    async execute({ name, email, message }: SaveContactInputDto): Promise<SaveContactOutputDto> {
        const contactExists = await this.contactGateway.findOneByEmail(email);
        if (contactExists) {
            throw new Error("Contact exists!");
        }

        const contact = Contact.create(name, email, message);

        await this.contactGateway.save(contact);

        const output = this.presentContact(contact);
        return output;
    }

    private presentContact(contact: Contact) {
        return {
            id: contact.id,
        }
    }
}