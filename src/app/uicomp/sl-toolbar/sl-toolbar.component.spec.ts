import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlToolbarComponent } from './sl-toolbar.component';

describe('SlToolbarComponent', () => {
  let component: SlToolbarComponent;
  let fixture: ComponentFixture<SlToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
