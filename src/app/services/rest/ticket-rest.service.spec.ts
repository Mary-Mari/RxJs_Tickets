import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsRestService } from './tickets-rest.service';

describe('RestComponent', () => {
  let component: TicketsRestService;
  let fixture: ComponentFixture<TicketsRestService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsRestService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsRestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
