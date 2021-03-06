import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { Question } from '../models/Question';

describe('DataService isolated test', () => {
  let service: DataService;

  beforeEach( () => {
    service = new DataService();
  });

  it('Get questions', () => {
    expect(service.getQuestions()).toEqual([]);
  });

  it('Add new question', () => {
    const newQuestion = new Question('What is your name?', 'Sherlock', false);
    service.addQuestion(newQuestion);
    expect(service.getQuestions()[0].text).toEqual(newQuestion.text);
  });

  it('Delete question', () => {
    const question = service.getQuestions()[0];
    service.removeQuestion(question);
    expect(service.getQuestions()).toEqual([]);
  });
});
