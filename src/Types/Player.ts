import { PlayerRoles } from "../Helpers/PlayerRoles"

export class Player {
    id: string
    name: string
    roomId?: string
    playerRole?: PlayerRoles
    isDead?: boolean = false

    constructor(id: string, name: string, roomId?: string, playerRole?: PlayerRoles) {
        this.id = id
        this.name = name
        this.playerRole = playerRole
        this.roomId = roomId
    }
}