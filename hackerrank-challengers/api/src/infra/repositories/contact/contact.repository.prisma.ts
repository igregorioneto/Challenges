import { PrismaClient } from "@prisma/client";
import { Contact } from "../../../domain/contact/entity/contact";
import { ContactGateway } from "../../../domain/contact/gateway/contact.gateway";

export class ContactRepositoryPrisma implements ContactGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new ContactRepositoryPrisma(prismaClient);
    }

    async save(contact: Contact): Promise<void> {
        const data = {
            id: contact.id,
            name: contact.name,
            email: contact.email,
            message: contact.message
        };

        await this.prismaClient.contact.create({
            data,
        });
    }

    async list(): Promise<Contact[]> {
        const contact = await this.prismaClient.contact.findMany();

        return contact.map((c) => {
            return Contact.with({
                id: c.id,
                name: c.name,
                email: c.email,
                message: c.message,
            });
        });
    }

    async findOneByEmail(email: string): Promise<Contact | undefined> {
        const contact = await this.prismaClient.contact.findFirst({ where: { email } })
        return contact ? Contact.with({ 
            id: contact.id,
            name: contact.name,
            email: contact.email,
            message: contact.message
        }) : undefined;
    }
    
}