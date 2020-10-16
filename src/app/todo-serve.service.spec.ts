import { TestBed } from '@angular/core/testing';

import { TodoServeService } from './todo-serve.service';

describe('TodoServeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoServeService = TestBed.get(TodoServeService);
    expect(service).toBeTruthy();
  });
});
