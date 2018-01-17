import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { QuestionListComponent } from './question-list.component';
import { DataService } from '../../services/data.service';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let dataService: DataService;

  beforeEach(async(() => {

    const dataServiceStub =
      [ {
        text : 'What is your name',
        answer : 'Aara',
        hide: false
      }];

    TestBed.configureTestingModule({
      declarations: [ QuestionListComponent ],
      providers : [{provide: DataService, useValue: dataServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;

    dataService = fixture.debugElement.injector.get(DataService);

    // de = fixture.debugElement.query()
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
