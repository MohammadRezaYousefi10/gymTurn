import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealsPage } from './meals.page';

describe('MealsPage', () => {
  let component: MealsPage;
  let fixture: ComponentFixture<MealsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
