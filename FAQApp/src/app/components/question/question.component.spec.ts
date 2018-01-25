import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { QuestionComponent } from './question.component';
import { DataService } from '../../services/data.service';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {

    const dataServiceStub = {
      removeQuestion() {
        component.question = { text: '', answer: '', hide: false };
      }
    };
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
    el = de.nativeElement;
    component.question = { text: 'What is your name?', answer: 'Aara', hide: false };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('verify question', () => {
    expect(el.textContent).toContain(component.question.text);
  });

  it('verify answer', () => {
    de = fixture.debugElement.query(By.css('.card-text'));
    el = de.nativeElement;
    expect(el.textContent).toEqual(component.question.answer);
  });

  it('delete question', () => {
    component.removeQuestion(component.question);
    fixture.detectChanges();

    expect(el.textContent).toContain(component.question.text);
    de = fixture.debugElement.query(By.css('.card-text'));
    el = de.nativeElement;
    expect(el.textContent).toEqual(component.question.answer);
  });
});
