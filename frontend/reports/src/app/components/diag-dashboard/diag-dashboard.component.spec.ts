import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagDashboardComponent } from './diag-dashboard.component';

describe('DiagDashboardComponent', () => {
  let component: DiagDashboardComponent;
  let fixture: ComponentFixture<DiagDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
