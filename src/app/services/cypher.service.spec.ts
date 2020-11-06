import {inject, TestBed} from '@angular/core/testing';

import { CypherService } from './cypher.service';

describe('CypherService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CypherService]
    });
  });

  it('service should be created', inject([CypherService], (service: CypherService) => {
    const encryptHola = service.encrypt('Hola');
    const decryptHola = service.decrypt(encryptHola);
    expect(encryptHola).toBeTruthy();
    expect(decryptHola).toBeTruthy();
    expect(service).toBeTruthy();
  }));
});
