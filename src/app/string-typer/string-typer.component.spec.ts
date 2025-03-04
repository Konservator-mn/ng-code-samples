import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringTyperComponent } from './string-typer.component';

describe('StringTyperComponent', () => {
  let component: StringTyperComponent;
  let fixture: ComponentFixture<StringTyperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringTyperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StringTyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
