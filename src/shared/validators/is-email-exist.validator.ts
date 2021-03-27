import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import * as _users from "../../../seeds/users.json";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailExistValidator implements ValidatorConstraintInterface {
  constructor(
  ) {}

  async validate(email: any) {
    return _users.some((user) => user.email === email);
  }
}

export function IsEmailExist(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistValidator,
    });
  };
}
