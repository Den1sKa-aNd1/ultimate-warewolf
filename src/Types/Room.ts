import { Player } from "./Player"

export class Room {
    id: string
    name: string
    players: Player[] = []
    dbId: string = ''

    constructor(id: string, name: string, dbId: string) {
        this.id = id
        this.name = name
        this.dbId = dbId
    }
}