import { BusinessError } from "./errors.interface";

export class InvalidCheckInDateError implements BusinessError {
  name = InvalidCheckInDateError.name;
  message = "Checkin date is invalid";
}

export class CheckOutBeforeCheckInError implements BusinessError {
  name = CheckOutBeforeCheckInError.name;
  message = "Checkout date can not be before CheckIn";
}

export class InvalidNumberOfAdultsError implements BusinessError {
  name = InvalidNumberOfAdultsError.name;
  message = "Number of adults is invalid"
}

export class InvalidNumberOfChildrenError implements BusinessError {
  name = InvalidNumberOfChildrenError.name;
  message = "Number of children is invalid"
}