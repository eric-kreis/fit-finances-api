import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class ManagerAlreadyRegistredException extends DomainException {
  code = DomainErrorCode.ManagerAlreadyRegistred;

  message = 'Manager already registred';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}
