import { z } from "zod";

export const SearchRoomSchema = z.object({
  checkIn: z.string({required_error: 'checkIn field is required', invalid_type_error: 'checkIn must be a date', }).datetime(),
  checkOut: z.string({required_error: 'checkOut field is required', invalid_type_error: 'checkOut must be a date'}).datetime(),
  numberOfAdults: z.number({invalid_type_error: 'Number of adults must be a valid number'}).optional(),
  numberOfChildren: z.number({invalid_type_error: 'Number of children must be a valid number'}).optional()
})