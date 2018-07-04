import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailSemiprobetaComponent } from './list-detail-semiprobeta.component';

describe('ListDetailSemiprobetaComponent', () => {
  let component: ListDetailSemiprobetaComponent;
  let fixture: ComponentFixture<ListDetailSemiprobetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailSemiprobetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailSemiprobetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
