import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import Subject from "./modules/entities/subject";
import Question from "./modules/entities/question";
import Option from "./modules/entities/option";

export function jsonQuestionsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value == null || value === '') {
      return { invalidJsonFormat: { reason: 'Value is required' } };
    }

    if (typeof value !== 'string') {
      return { invalidJsonFormat: { reason: 'Value must be a string' } };
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(value);
    } catch {
      return { invalidJsonFormat: { reason: 'Invalid JSON syntax' } };
    }

    if (!isValidSubjects(parsed)) {
      return { invalidJsonFormat: { reason: 'JSON does not match expected schema' } };
    }

    return null;
  };
}

function isValidSubjects(value: unknown): value is Subject[] {
  return (
    Array.isArray(value) &&
    value.every(isValidQuizSubject)
  );
}

function isValidQuizSubject(value: unknown): value is Subject {
  if (!isObject(value)) return false;

  return (
    typeof value['description'] === 'string' &&
    Array.isArray(value['questions']) &&
    value['questions'].every(isValidQuestion)
  );
}

function isValidQuestion(value: unknown): value is Question {
  if (!isObject(value)) return false;

  return (
    typeof value['questionId'] === 'number' &&
    typeof value['description'] === 'string' &&
    Array.isArray(value['options']) &&
    value['options'].every(isValidOption) &&
    typeof value['answerId'] === 'number'
  );
}

function isValidOption(value: unknown): value is Option {
  if (!isObject(value)) return false;

  return (
    typeof value['optionId'] === 'number' &&
    typeof value['description'] === 'string'
  );
}

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}