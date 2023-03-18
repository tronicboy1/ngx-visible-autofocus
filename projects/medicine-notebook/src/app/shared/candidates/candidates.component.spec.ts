import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Medicine } from '../../medicine-db/medicine-factory';
import { CandidatesComponent } from './candidates.component';

describe('CandidatesComponent', () => {
  let component: CandidatesComponent<Medicine>;
  let fixture: ComponentFixture<typeof component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesComponent<Medicine>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
