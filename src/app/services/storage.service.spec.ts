import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AppModule } from 'src/app/app.module';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
    })
    .compileComponents();
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
