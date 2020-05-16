import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotAutorized } from './page-not-autorized.component';

describe('PageNotAutorized', () => {
  let component: PageNotAutorized;
  let fixture: ComponentFixture<PageNotAutorized>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotAutorized ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotAutorized);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
