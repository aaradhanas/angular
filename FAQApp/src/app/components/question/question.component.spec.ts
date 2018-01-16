import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

import { QuestionComponent } from './question.component';
import { DataService } from '../../services/data.service'

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let dataService: DataService;

  beforeEach(async(() => {

    var dataServiceStub = {}
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ],
      providers: [{provide: DataService, useValue: dataServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('.card-header'));
    el = de.nativeElement

    dataService = de.injector.get(DataService)
    component.question = { text: 'What is your name?', answer: 'Aara', hide: false }
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('verify question', () => {
    expect(el.textContent).toContain('What is your name?');
  });

  it('verify answer', () => {
    de = fixture.debugElement.query(By.css('.card-text'));
    el = de.nativeElement
    expect(el.textContent).toEqual('Aara');
  })
});
