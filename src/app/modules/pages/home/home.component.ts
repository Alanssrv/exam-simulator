import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsonQuestionsValidator } from '../../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  public examForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initForm();
    this.resetForm();
  }

  initForm() {
    this.examForm = this.fb.group({
      timeLimit: [0, Validators.min(1)],
      examQuestions: ['', jsonQuestionsValidator().bind(this)],
    });
  }

  resetForm() {
    this.examForm.reset({
      timeLimit: 0,
      examQuestions: '',
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      localStorage.setItem('examData', JSON.stringify(this.examForm.value));
      this.resetForm();
      this.router.navigate(['/exam']);
    }
  }
}
