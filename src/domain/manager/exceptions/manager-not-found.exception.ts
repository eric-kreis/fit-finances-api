import { DomainErrorCode } from '@domain/domain-error-code.enum';
import { DomainException } from '@domain/domain.exception';

export class ManagerNotFoundException extends DomainException {
  code: DomainErrorCode.ManagerNotFound;

  message = 'Manager not found';
}
