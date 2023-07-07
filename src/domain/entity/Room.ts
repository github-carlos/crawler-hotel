export type RoomInput = {
  name: string
  description: string
  price: string
  image: string
}

export class Room {
  name: string
  description: string
  price: string
  image: string

  constructor(properties: RoomInput) {
    this.name = properties.name
    this.description = properties.description
    this.price = properties.price
    this.image = properties.image
  }
}