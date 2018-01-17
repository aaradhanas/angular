import { Injectable } from '@angular/core';
import { Question } from '../models/Question';

@Injectable()
export class DataService {

  questions: Question[] = [];
  constructor() {
  }

  // Get questions from local storage
  getQuestions() {
    if (localStorage.getItem('questions') != null) {
      this.questions = JSON.parse(localStorage.getItem('questions'));
    }
    return this.questions;
  }

  // Add questions to local storage
  addQuestion(question: Question) {
    this.questions.unshift(question);

    // Init local variable
    /*let questions = [];
    if(localStorage.getItem('questions') === null){
      questions = [];
      //Push new question
      questions.unshift(question);
      // Set new array to local storage
    }else{
      questions = JSON.parse(localStorage.getItem('questions'));
      questions.unshift(question);
    }*/

    localStorage.setItem('questions', JSON.stringify(this.questions));

  }

  // Remove questions from local storage
  removeQuestion(question: Question) {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i] === question) {
        this.questions.splice(i, 1);
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    }
  }

}
