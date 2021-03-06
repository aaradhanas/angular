import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AddQuestionComponent } from './add-question.component';
import { Question } from '../../models/Question';

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionComponent ],
      imports : [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('raise question added event', () => {

    de = fixture.debugElement.query(By.css('.question'));
    const questionEl = de.nativeElement;
    questionEl.value = 'What is your name?';

    de = fixture.debugElement.query(By.css('.answer'));
    const answerEl = de.nativeElement;
    answerEl.value = 'Aara';

    component.questionAdded.subscribe((question: Question) =>  {
      expect(question.text).toEqual(questionEl.value);
      expect(question.answer).toEqual(answerEl.value);
    });

    component.text = questionEl.value;
    component.answer = answerEl.value;
    component.addQuestion();
  });
});
