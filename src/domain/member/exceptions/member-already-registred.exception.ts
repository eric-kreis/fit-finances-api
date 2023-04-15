import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class MemberAlreadyRegistredException extends DomainException {
  code = DomainErrorCode.MemberAlreadyRegistred;

  message = 'Member already registred';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}
