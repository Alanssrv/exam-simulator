import { Component, Input } from '@angular/core';
import Question from '../../../entities/question';

@Component({
  selector: 'question-card',
  imports: [],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  @Input() question: Question = null as any;
  @Input() questionIndex: number = -1;
  @Input() subjectName: string = null as any;
  @Input() checkedAnswerId: number | null = null;
}
