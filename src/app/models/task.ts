export class Task {
  private _ID: string;
  private _NAME: string;
  private _PRIORITY: number;
  private _DATE: Date;
  private _USERID: string;

  constructor() {
  }

  get id(): string {
    return this._ID;
  }

  set id(value: string) {
    this._ID = value;
  }

  get name(): string {
    return this._NAME;
  }

  set name(value: string) {
    this._NAME = value;
  }

  get priority(): number {
    return this._PRIORITY;
  }

  set priority(value: number) {
    this._PRIORITY = value;
  }

  get date(): Date {
    return this._DATE;
  }

  set date(value: Date) {
    this._DATE = value;
  }

  get userId(): string {
    return this._USERID;
  }

  set userId(value: string) {
    this._USERID = value;
  }
}
