import { DomainErrorCode } from '@domain/domain-error-code.enum';
import { DomainException } from '@domain/domain.exception';

export class MemberAlreadyRegistredException extends DomainException {
  code = DomainErrorCode.MemberAlreadyRegistred;

  message = 'Member already registred';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}
