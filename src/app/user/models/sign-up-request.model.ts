export class SignUpRequest {
  constructor(obj?) {
    if (obj) {
      this.userId = obj.userId;
      this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.password = obj.password;
    }
  }
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
}
