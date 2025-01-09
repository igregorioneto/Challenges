import { Contact } from "../entity/contact";

export interface ContactGateway {
    save(contact: Contact): Promise<void>;
    list(): Promise<Contact[]>;
    findOneByEmail(email: string): Promise<Contact | undefined>;
}