import { Server } from "./server";

export interface Item {
    id: string;
    name: string;
    serverId: string;
    server: Server;
    identifier: number;
    effects: string;
    createdAt: Date;
    updatedAt: Date;
}
