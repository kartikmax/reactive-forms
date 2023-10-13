import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaFormsComponent } from './rea-forms.component';

describe('ReaFormsComponent', () => {
  let component: ReaFormsComponent;
  let fixture: ComponentFixture<ReaFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReaFormsComponent]
    });
    fixture = TestBed.createComponent(ReaFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
