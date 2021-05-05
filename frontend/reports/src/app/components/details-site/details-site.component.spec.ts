import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSiteComponent } from './details-site.component';

describe('DetailsSiteComponent', () => {
  let component: DetailsSiteComponent;
  let fixture: ComponentFixture<DetailsSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
