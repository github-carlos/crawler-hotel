import { CheckOutBeforeCheckInError, InvalidCheckInDateError, InvalidNumberOfAdultsError, InvalidNumberOfChildrenError } from "@domain/error"
import { isBefore } from "date-fns"

export type RoomSearchInput = {
  checkIn: Date
  checkOut: Date
  numberOfAdults?: number
  numberOfChildren?: number
}

export class RoomSearch {
  private _checkIn: Date
  private _checkOut: Date
  private _numberOfAdults: number
  private _numberOfChildren: number

  constructor(properties: RoomSearchInput) {
    this._checkIn = properties.checkIn
    this._checkOut = properties.checkOut
    this._numberOfAdults = properties.numberOfAdults ?? 2
    this._numberOfChildren = properties.numberOfChildren ?? 0

    this.validate()
  }

  private validate() {
    if (isBefore(this._checkOut, this._checkIn)) {
      throw new CheckOutBeforeCheckInError()
    }

    if (isBefore(this._checkIn, new Date())) {
      throw new InvalidCheckInDateError()
    }

    if (this._numberOfAdults <= 0) {
      throw new InvalidNumberOfAdultsError()
    }

    if (this._numberOfChildren < 0) {
      throw new InvalidNumberOfChildrenError()
    }
  }

  // using setters and getters for protecting Entity integration so it's
  // state never gets invalid
  set checkIn(newCheckIn: Date) {
    this._checkIn = newCheckIn
    this.validate()
  }

  set checkOut(newCheckOut: Date) {
    this._checkOut = newCheckOut
    this.validate()
  }

  set numberOfAdults(adults: number) {
    this._numberOfAdults = adults
    this.validate()
  }

  set numberOfChildren(children: number) {
    this._numberOfChildren = children
    this.validate()
  }

  get checkIn() {
    return this._checkIn
  }

  get checkOut() {
    return this._checkOut
  }
  
  get numberOfAdults() {
    return this._numberOfAdults
  }

  get numberOfChildren() {
    return this._numberOfChildren
  }
}