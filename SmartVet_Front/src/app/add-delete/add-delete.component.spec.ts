import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeleteComponent } from './add-delete.component';

describe('AddDeleteComponent', () => {
  let component: AddDeleteComponent;
  let fixture: ComponentFixture<AddDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeleteComponent]
    });
    fixture = TestBed.createComponent(AddDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
