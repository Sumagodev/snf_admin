import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NriParticipantsComponent } from './nri-participants.component';

describe('NriParticipantsComponent', () => {
  let component: NriParticipantsComponent;
  let fixture: ComponentFixture<NriParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NriParticipantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NriParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
