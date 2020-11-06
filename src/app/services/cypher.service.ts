import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CypherService {

  constructor() {
  }
  private readonly cypherKey = environment.cypherKey;

  private static parseItem(item: any): any {
    if (item === null || item === undefined) {
      return null;
    }
    return JSON.parse(item);
  }

  public encrypt(data: any, key?: string): string {
    key = key ? key : this.cypherKey;
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key);
    return cipherText.toString();
  }

  public decrypt(cipherText: string, key?: string): any {
    key = key ? key : this.cypherKey;
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return CypherService.parseItem(bytes.toString(CryptoJS.enc.Utf8));
  }
}
