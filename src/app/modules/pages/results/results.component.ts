import { Component, OnInit } from '@angular/core';
import Question from '../../entities/question';
import Subject from '../../entities/subject';
import { QuestionCardComponent } from './question-card/question-card.component';

@Component({
  selector: 'app-results',
  imports: [QuestionCardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {

  public examQuestions: Subject[] = [];
  public answersMap: { subjectIndex: number; questionIndex: number; optionId: number }[] = [];
  public selectedSubjectIndex: number = -1;

  get totalQuestions() {
    if (this.selectedSubjectIndex === -1) {
      return this.examQuestions.reduce((total, subject) => total + subject.questions.length, 0);
    }
    return this.examQuestions[this.selectedSubjectIndex].questions.length;
  }

  get answeredQuestions() {
    if (this.selectedSubjectIndex === -1) {
      return this.answersMap.length;
    }
    return this.answersMap.filter(answer => answer.subjectIndex === this.selectedSubjectIndex).length;
  }

  get unansweredQuestions() {
    if (this.selectedSubjectIndex === -1) {
      return this.examQuestions.reduce((total, subject) => total + subject.questions.length, 0) - this.answeredQuestions;
    }
    return this.examQuestions[this.selectedSubjectIndex].questions.length - this.answeredQuestions;
  }

  get correctQuestions() {
    if (this.selectedSubjectIndex === -1) {
      return this.answersMap.filter(answer => {
        const question = this.examQuestions[answer.subjectIndex].questions[answer.questionIndex];
        return question.answerId === answer.optionId;
      }).length;
    }
    return this.answersMap.filter(answer => {
      if (answer.subjectIndex !== this.selectedSubjectIndex) {
        return false;
      }
      const question = this.examQuestions[this.selectedSubjectIndex].questions[answer.questionIndex];
      return question.answerId === answer.optionId;
    }).length;
  }

  get incorrectQuestions() {
    if (this.selectedSubjectIndex === -1) {
      return this.answersMap.filter(answer => {
        const question = this.examQuestions[answer.subjectIndex].questions[answer.questionIndex];
        return question.answerId !== answer.optionId;
      }).length;
    }
    return this.answersMap.filter(answer => {
      if (answer.subjectIndex !== this.selectedSubjectIndex) {
        return false;
      }
      const question = this.examQuestions[this.selectedSubjectIndex].questions[answer.questionIndex];
      return question.answerId !== answer.optionId;
    }).length;
  }

  ngOnInit(): void {
    const examData = localStorage.getItem('examData');
    const answersMap = localStorage.getItem('examResults');
    if (examData) {
      this.examQuestions = JSON.parse(JSON.parse(examData).examQuestions);
    }
    if (answersMap) {
      this.answersMap = JSON.parse(answersMap);
    }
    console.log('Exam Questions:', this.examQuestions);
    console.log('Answers Map:', this.answersMap);
  }

  changeSubject(subjectIndex: number) {
    if (subjectIndex === this.selectedSubjectIndex) {
      this.selectedSubjectIndex = -1; // Deselect if the same subject is clicked again
    } else {
      this.selectedSubjectIndex = subjectIndex;
    }
  }

  checkedAnswerId(subjectIndex: number, questionIndex: number): number | null {
    const answer = this.answersMap.find(answer => answer.subjectIndex === subjectIndex && answer.questionIndex === questionIndex);
    if (answer) {
      const question = this.examQuestions[subjectIndex].questions[questionIndex];
      const selectedOption = question.options.find(option => option.optionId === answer.optionId);
      return selectedOption ? selectedOption.optionId : null;
    }
    return null;
  }

  // showCorrectAnswerId(question: Question): string | null {
  //   const correctOption = question.options.find(option => option.optionId === question.answerId);
  //   return correctOption ? correctOption.description : null;
  // }
}
