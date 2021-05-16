import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';


export class UserIdAvailableAsyncValidator {
  static createValidator(usersService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return usersService.isUserIdAvailable(control.value)
        .pipe(map((val) => (val ? null : { notAvailable: true })));
    }
  }
}
