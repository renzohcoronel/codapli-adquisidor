import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailRigidezComponent } from './list-detail-rigidez.component';

describe('ListDetailRigidezComponent', () => {
  let component: ListDetailRigidezComponent;
  let fixture: ComponentFixture<ListDetailRigidezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailRigidezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailRigidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
