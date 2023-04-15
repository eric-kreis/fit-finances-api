import { DomainErrorCode } from '@domain/domain-error-code.enum';
import { DomainException } from '@domain/domain.exception';

export class MemberNotFoundException extends DomainException {
  code = DomainErrorCode.MemberNotFound;

  message = 'Member not found';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}
