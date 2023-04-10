import { DomainErrorCode } from '@domain/domain-error-code.enum';
import { DomainException } from '@domain/domain.exception';

export class ManagerAlreadyRegistredException extends DomainException {
  code: DomainErrorCode.ManagerAlreadyRegistred;

  message = 'Manager already registred';
}
