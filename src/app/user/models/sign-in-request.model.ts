export class SignInRequest {
  constructor(obj?) {
    if (obj) {
      this.userId = obj.userId;
      this.password = obj.password;
    }
  }
  userId: string;
  password: string;
}
