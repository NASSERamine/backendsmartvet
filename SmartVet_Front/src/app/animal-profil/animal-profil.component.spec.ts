import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalProfilComponent } from './animal-profil.component';

describe('AnimalProfilComponent', () => {
  let component: AnimalProfilComponent;
  let fixture: ComponentFixture<AnimalProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalProfilComponent]
    });
    fixture = TestBed.createComponent(AnimalProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
