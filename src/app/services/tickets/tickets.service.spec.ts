import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsService } from './tickets.service';

describe('TicketsComponent', () => {
  let component: TicketsService;
  let fixture: ComponentFixture<TicketsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
