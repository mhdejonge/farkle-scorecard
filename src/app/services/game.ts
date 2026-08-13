import { Injectable, signal, WritableSignal } from '@angular/core';
import { emptyScoreCard, ScoreCard } from './score';
import { ResultsDialogData } from '@app/components/results-dialog';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly STORAGE_KEY = 'farkle-scorecard';

  scoreCard = signal(this.loadScoreCard());
  currentTurnScore = signal(emptyScoreCard());

  private loadScoreCard(): ScoreCard {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return emptyScoreCard();
  }

  private saveCurrentScoreCard(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scoreCard()));
  }

  saveScoreCard(scoreCard: ScoreCard): void {
    this.scoreCard.set(scoreCard);
    this.saveCurrentScoreCard();
  }

  addToCurrentTurn(points: number): void {
    this.addToScoreCard(this.currentTurnScore, points);
  }

  bank(): void {
    const turnScore = this.currentTurnScore().total;
    this.currentTurnScore.set(emptyScoreCard());
    this.addToScoreCard(this.scoreCard, turnScore);
    this.saveCurrentScoreCard();
  }

  farkle(): ResultsDialogData {
    const total = this.currentTurnScore().total;
    this.currentTurnScore.set(emptyScoreCard());
    const firstRollFarkle = total <= 0;
    const firstRollFarklePoints = -1000;
    if (firstRollFarkle) {
      this.addToScoreCard(this.scoreCard, firstRollFarklePoints);
      return { type: 'frf', points: firstRollFarklePoints };
    } else {
      return { type: 'farkle', points: 0 };
    }
  }

  undo(): void {
    this.currentTurnScore.update((current) => {
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
    scoreCard.update((current) => ({
      turns: [...current.turns, points],
      total: current.total + points,
    }));
  }
}
