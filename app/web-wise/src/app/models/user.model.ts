export class User {
  id: string;
  username: string;
  password: string;
  email: string;

  constructor(id: string, username: string, password: string, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
