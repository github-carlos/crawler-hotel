import { addDays } from 'date-fns'
import { RoomSearch } from './RoomSearch'
import { CheckOutBeforeCheckInError, InvalidCheckInDateError, InvalidNumberOfAdultsError, InvalidNumberOfChildrenError } from '@domain/error'

describe('#RoomSearch', () => {
  describe('success', () => {

    const checkIn = addDays(new Date(), 1)
    const checkOut = addDays(new Date(), 5)
    test('should create RoomSearch with success with default values', () => {
      const roomSearch = new RoomSearch({ checkIn, checkOut })
      expect(roomSearch.checkIn).toBe(checkIn)
      expect(roomSearch.checkOut).toBe(checkOut)
      expect(roomSearch.numberOfAdults).toBe(2)
      expect(roomSearch.numberOfChildren).toBe(0)
    })

    test('should create RoomSearch with success and given values', () => {
      const numberOfAdults = 1
      const numberOfChildren = 2
      
      const roomSearch = new RoomSearch({ checkIn, checkOut, numberOfAdults, numberOfChildren })
      expect(roomSearch.checkIn).toBe(checkIn)
      expect(roomSearch.checkOut).toBe(checkOut)
      expect(roomSearch.numberOfAdults).toBe(numberOfAdults)
      expect(roomSearch.numberOfChildren).toBe(numberOfChildren)
    })

  })
  describe('fail', () => {
    test('should throw error when checkout date is before than checkin date', () => {
      const checkIn = new Date()
      const checkOut = addDays(new Date(), -2)
      expect(() => new RoomSearch({ checkIn, checkOut })).toThrow(CheckOutBeforeCheckInError)
    })
    test('should throw error when checkin date if before than current date', () => {
      const checkIn = addDays(new Date(), -2)
      const checkOut = new Date()
      expect(() => new RoomSearch({ checkIn, checkOut })).toThrow(InvalidCheckInDateError)
    })
    test('should throw error when number of adults is negative', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const numberOfAdults = -2
      expect(() => new RoomSearch({ checkIn, checkOut, numberOfAdults })).toThrow(InvalidNumberOfAdultsError)
    })
    test('should throw error when number of adults is zero', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const numberOfAdults = 0
      expect(() => new RoomSearch({ checkIn, checkOut, numberOfAdults })).toThrow(InvalidNumberOfAdultsError)
    })
    test('should throw error when number of chlildren is negative', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const numberOfChildren = -1
      expect(() => new RoomSearch({ checkIn, checkOut, numberOfChildren })).toThrow(InvalidNumberOfChildrenError)
    })

    test('should throw error when checkIn is changed to invalid state', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const roomSearch = new RoomSearch({ checkIn, checkOut })
      expect(() => { roomSearch.checkIn = addDays(new Date(), -2) } ).toThrow(InvalidCheckInDateError)
    })
    test('should throw error when checkOut is changed to invalid state', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const roomSearch = new RoomSearch({ checkIn, checkOut })
      expect(() => { roomSearch.checkOut = addDays(new Date(), -2) } ).toThrow(CheckOutBeforeCheckInError)
    })
    test('should throw error when numberOfAdults is changed to invalid state', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const numberOfAdults = 2
      const roomSearch = new RoomSearch({ checkIn, checkOut, numberOfAdults })
      expect(() => { roomSearch.numberOfAdults = -2 } ).toThrow(InvalidNumberOfAdultsError)
    })
    test('should throw error when numberOfChildren is changed to invalid state', () => {
      const checkIn = addDays(new Date(), 1)
      const checkOut = addDays(new Date(), 2)
      const numberOfChildren = 2
      const roomSearch = new RoomSearch({ checkIn, checkOut, numberOfChildren })
      expect(() => { roomSearch.numberOfChildren = -2 } ).toThrow(InvalidNumberOfChildrenError)
    })
  })
})