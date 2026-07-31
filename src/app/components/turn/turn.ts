import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { switchMap, timer } from 'rxjs';
import { GameService, ScoringOption, ScoringOptions } from '@app/services';

@Component({
  selector: 'app-turn',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './turn.html',
  styleUrl: './turn.scss'
})
export class TurnComponent {
  scoringOptions = ScoringOptions;
  router = inject(Router);
  gameService = inject(GameService);

  currentScore = computed(() => this.gameService.currentTurnScore().total);
  undoDisabled = computed(() => !this.gameService.currentTurnScore().turns.length || this.finishedSignal());
  bankDisabled = computed(() => this.gameService.currentTurnScore().total <= 0 || this.finishedSignal());
  farkleDisabled = computed(() => this.finishedSignal());
  finishedSignal = signal(false);

  addScore(option: ScoringOption): void {
    this.gameService.addToCurrentTurn(option.points);
  }

  bank(): void {
    this.gameService.bank();
    this.finished();
  }

  farkle(): void {
    this.gameService.farkle();
    this.finished();
  }

  undo(): void {
    this.gameService.undo();
  }

  finished(): void {
    this.finishedSignal.set(true);
    timer(5000).pipe(switchMap(() => this.router.navigate(['/scorecard']))).subscribe();
  }
}
