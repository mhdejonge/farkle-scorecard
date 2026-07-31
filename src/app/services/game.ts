import { Injectable, signal, WritableSignal } from '@angular/core';
import { emptyScoreCard, ScoreCard } from './score';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly STORAGE_KEY = 'farkle-scorecard';

  scoreCard = signal(this.loadScoreCard());
  currentTurnScore = signal(emptyScoreCard());

  constructor() {}

  private loadScoreCard(): ScoreCard {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return emptyScoreCard();
  }

  private saveScoreCard(scoreCard: ScoreCard): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scoreCard));
    this.scoreCard.set(scoreCard);
  }

  addToCurrentTurn(points: number): void {
    this.addToScoreCard(this.currentTurnScore, points);
  }

  bank(): void {
    const turnScore = this.currentTurnScore().total;
    this.addToScoreCard(this.scoreCard, turnScore);
    this.currentTurnScore.set(emptyScoreCard());
  }

  farkle(): boolean {
    const total = this.currentTurnScore().total;
    this.currentTurnScore.set(emptyScoreCard());
    const firstRollFarkle = total <= 0;
    if (firstRollFarkle) {
      this.addToScoreCard(this.scoreCard, -1000);
    }
    return firstRollFarkle;
  }

  undo(): void {
    this.currentTurnScore.update(current => {
      const turns = [...current.turns];
      const last = turns.pop() ?? 0;
      const total = current.total - last;
      return { turns, total };
    });
  }

  newGame(): void {
    this.saveScoreCard(emptyScoreCard());
    this.currentTurnScore.set(emptyScoreCard());
  }

  private addToScoreCard(scoreCard: WritableSignal<ScoreCard>, points: number): void {
    scoreCard.update(current => ({
      turns: [...current.turns, points],
      total: current.total + points
    }));
  }
}
