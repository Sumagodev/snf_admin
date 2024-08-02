import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateParticipantsComponent } from './state-participants.component';

describe('StateParticipantsComponent', () => {
  let component: StateParticipantsComponent;
  let fixture: ComponentFixture<StateParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateParticipantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
