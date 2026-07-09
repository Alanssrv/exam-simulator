import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Subject from '../../entities/subject';
import Option from '../../entities/option';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exam',
  imports: [DatePipe],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit {
  private router = inject(Router);

  public timeLimit: number = 0;
  public examQuestions: Subject[] = [];
  public answersMap: { subjectIndex: number; questionIndex: number; optionId: number }[] = [];
  public navigationHistory: { subjectIndex: number; questionIndex: number }[] = [];

  public selectedSubjectIndex: number = 0;
  public selectedQuestionIndex: number = 0;

  get range() {
    return Array.from({ length: this.examQuestions[this.selectedSubjectIndex].questions.length }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    const examData = localStorage.getItem('examData');
    if (examData) {
      const parsedData = JSON.parse(examData);
      this.timeLimit = parsedData.timeLimit;
      this.examQuestions = JSON.parse(parsedData.examQuestions);
      this.startExam();
    } else {
      this.router.navigate(['/home']);
    }
  }

  startExam() {
    this.timeLimit = this.timeLimit * 60; // Convert minutes to seconds
    this.answersMap = [];
    this.navigationHistory = this.examQuestions.map((subject, subjectIndex) => ({
      subjectIndex,
      questionIndex: 0
    }));
    this.startTimer();
  }
  
  startTimer() {
    const timerInterval = setInterval(() => {
      if (this.timeLimit > 0) {
        this.timeLimit--;
      } else {
        clearInterval(timerInterval);
        this.submitExam();
      }
    }, 1000);
  }

  selectOption(option: Option) {
    const existingAnswerIndex = this.answersMap.findIndex(answer => answer.subjectIndex === this.selectedSubjectIndex && answer.questionIndex === this.selectedQuestionIndex);
    if (existingAnswerIndex !== -1) {
      this.answersMap[existingAnswerIndex].optionId = option.optionId;
    } else {
      this.answersMap.push({
        subjectIndex: this.selectedSubjectIndex,
        questionIndex: this.selectedQuestionIndex,
        optionId: option.optionId
      });
    }
  }

  changeSubject(subjectIndex: number) {
    this.selectedSubjectIndex = subjectIndex;
    this.selectedQuestionIndex = this.navigationHistory[subjectIndex].questionIndex;
  }

  changeQuestion(questionIndex: number) {
    if (questionIndex < 0 || questionIndex >= this.examQuestions[this.selectedSubjectIndex].questions.length) {
      return; // Out of bounds, do nothing
    }
    this.selectedQuestionIndex = questionIndex;
    this.navigationHistory[this.selectedSubjectIndex].questionIndex = questionIndex;
  }

  optionChecked(option: Option): boolean {
    return this.answersMap.find(answer => answer.subjectIndex === this.selectedSubjectIndex && answer.questionIndex === this.selectedQuestionIndex)?.optionId === option.optionId;
  }

  exitExam() {
    localStorage.removeItem('examData');
    this.router.navigate(['']);
  }

  submitExam() {
    localStorage.setItem('examResults', JSON.stringify(this.answersMap));
    this.router.navigate(['/results']);
  }
}
