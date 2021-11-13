import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalscriptsComponent } from './finalscripts.component';

describe('FinalscriptsComponent', () => {
  let component: FinalscriptsComponent;
  let fixture: ComponentFixture<FinalscriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalscriptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
