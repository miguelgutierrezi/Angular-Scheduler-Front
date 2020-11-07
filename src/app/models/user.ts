export class User {

  private _ID: string;
  private _NAME: string;
  private _EMAIL: string;
  private _PASSWORD: string;

  constructor() {
  }

  get id(): string {
    return this._ID;
  }

  set id(id: string) {
    this._ID = id;
  }

  get name(): string {
    return this._NAME;
  }

  set name(name: string) {
    this._NAME = name;
  }

  get email(): string {
    return this._EMAIL;
  }

  set email(email: string) {
    this._EMAIL = email;
  }

  get password(): string {
    return this._PASSWORD;
  }

  set password(password: string) {
    this._PASSWORD = password;
  }
}
