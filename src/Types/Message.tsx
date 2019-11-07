export class Message {
    id: string = ''
    roomDbId: string = ''
    playerId: string = ''
    text: string = ''
    time: string = ''

    constructor(id: string, roomDbId: string, playerId: string, text: string, time: string) {
        this.id = id
        this.playerId = playerId
        this.text = text
        this.time = time
        this.roomDbId = roomDbId
    }
}