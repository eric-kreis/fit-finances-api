import { Transform } from 'class-transformer';

export function DateWithoutTime() {
  return Transform(({ value }) => {
    if (value === null) return value;

    const dateValue = new Date(value).toDateString();
    return new Date(dateValue);
  });
}
