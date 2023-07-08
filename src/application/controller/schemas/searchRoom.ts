import { z } from 'zod';

export const SearchRoomSchema = z.object({
  checkIn: z.date({required_error: 'checkIn field is required', invalid_type_error: 'checkIn must be a date', }),
  checkOut: z.date({required_error: 'checkOut field is required', invalid_type_error: 'checkOut must be a date'}),
  numberOfAdults: z.number({invalid_type_error: 'Number of adults must be a valid number'}).optional(),
  numberOfChildren: z.number({invalid_type_error: 'Number of children must be a valid number'}).optional()
})