import { ValidateIf } from 'class-validator';

export function OptionalUndefined() {
  return ValidateIf((_, value) => value !== undefined);
}
