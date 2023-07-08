import { BusinessError } from "./errors.interface";

export class InvalidCheckInDateError extends BusinessError {
  name = InvalidCheckInDateError.name;
  message = "Checkin date is invalid";
}

export class CheckOutBeforeCheckInError extends BusinessError {
  name = CheckOutBeforeCheckInError.name;
  message = "Checkout date can not be before CheckIn";
}

export class InvalidNumberOfAdultsError extends BusinessError {
  name = InvalidNumberOfAdultsError.name;
  message = "Number of adults is invalid"
}

export class InvalidNumberOfChildrenError extends BusinessError {
  name = InvalidNumberOfChildrenError.name;
  message = "Number of children is invalid"
}