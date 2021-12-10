import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllFeedsComponent } from './all-feeds.component';

describe('AllFeedsComponent', () => {
    let component: AllFeedsComponent;
    let fixture: ComponentFixture<AllFeedsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ AllFeedsComponent ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AllFeedsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
