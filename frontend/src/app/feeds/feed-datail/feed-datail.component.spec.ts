import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDatailComponent } from './feed-datail.component';

describe('FeedDatailComponent', () => {
  let component: FeedDatailComponent;
  let fixture: ComponentFixture<FeedDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedDatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
