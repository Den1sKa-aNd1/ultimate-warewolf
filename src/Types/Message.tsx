export class Message {
    id: string = ''
    roomId: string = ''
    playerId: string = ''
    text: string = ''
    time: string = ''

    constructor(id: string, roomId: string, playerId: string, text: string, time: string) {
        this.id = id
        this.playerId = playerId
        this.text = text
        this.time = time
    }
}