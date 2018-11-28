import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlNavbarComponent } from './sl-navbar.component';

describe('SlNavbarComponent', () => {
  let component: SlNavbarComponent;
  let fixture: ComponentFixture<SlNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
