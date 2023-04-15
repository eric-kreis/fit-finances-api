import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class MemberNotFoundException extends DomainException {
  code = DomainErrorCode.MemberNotFound;

  message = 'Member not found';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}
