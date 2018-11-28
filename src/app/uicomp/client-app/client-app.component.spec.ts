import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppComponent } from './client-app.component';

describe('ClientAppComponent', () => {
  let component: ClientAppComponent;
  let fixture: ComponentFixture<ClientAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
