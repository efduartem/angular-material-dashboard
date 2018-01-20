import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsFormComponent } from './google-maps-form.component';

describe('GoogleMapsFormComponent', () => {
  let component: GoogleMapsFormComponent;
  let fixture: ComponentFixture<GoogleMapsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
