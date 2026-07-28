import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ScoreCard {
  turns: number[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly STORAGE_KEY = 'farkle-scorecard';
  private scoreCardSubject = new BehaviorSubject<ScoreCard>(this.loadScoreCard());
  public scoreCard$ = this.scoreCardSubject.asObservable();

  private currentTurnScoreSubject = new BehaviorSubject<number>(0);
  public currentTurnScore$ = this.currentTurnScoreSubject.asObservable();

  constructor() {}

  private loadScoreCard(): ScoreCard {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { turns: [], total: 0 };
  }

  private saveScoreCard(scoreCard: ScoreCard): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scoreCard));
    this.scoreCardSubject.next(scoreCard);
  }

  addToCurrentTurn(points: number): void {
    const current = this.currentTurnScoreSubject.value;
    this.currentTurnScoreSubject.next(current + points);
  }

  bankTurn(): void {
    const currentScore = this.currentTurnScoreSubject.value;
    const scoreCard = this.scoreCardSubject.value;
    scoreCard.turns.push(currentScore);
    scoreCard.total += currentScore;
    this.saveScoreCard(scoreCard);
    this.currentTurnScoreSubject.next(0);
  }

  farkle(): void {
    this.currentTurnScoreSubject.next(0);
  }

  newGame(): void {
    this.currentTurnScoreSubject.next(0);
    const emptyScoreCard: ScoreCard = { turns: [], total: 0 };
    this.saveScoreCard(emptyScoreCard);
  }

  getCurrentTurnScore(): number {
    return this.currentTurnScoreSubject.value;
  }

  getScoreCard(): ScoreCard {
    return this.scoreCardSubject.value;
  }
}
