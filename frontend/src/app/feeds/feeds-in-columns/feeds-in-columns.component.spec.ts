import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsInColumnsComponent } from './feeds-in-columns.component';

describe('FeedsInColumnsComponent', () => {
  let component: FeedsInColumnsComponent;
  let fixture: ComponentFixture<FeedsInColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedsInColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsInColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
