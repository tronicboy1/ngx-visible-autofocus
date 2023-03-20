import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentModalComponent } from './email-sent-modal.component';

describe('EmailSentModalComponent', () => {
  let component: EmailSentModalComponent;
  let fixture: ComponentFixture<EmailSentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
