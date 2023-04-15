import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function isCpf(value: string): boolean {
  if (typeof value !== 'string') return false;
  const pattern = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
  return pattern.test(value);
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return isCpf(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a valid cpf (accepted formats: 000000000000 or 000.000.000-00)`;
        },
      },
    });
  };
}
