import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailAycfComponent } from './list-detail-aycf.component';

describe('ListDetailAycfComponent', () => {
  let component: ListDetailAycfComponent;
  let fixture: ComponentFixture<ListDetailAycfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailAycfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailAycfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
