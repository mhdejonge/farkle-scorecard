import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchMap, timer } from 'rxjs';
import { GameService, ScoringOption, ScoringOptions } from '@app/services';
import { ResultsDialogComponent } from '@app/components/results-dialog';

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
  dialog = inject(MatDialog);

  currentScore = computed(() => this.gameService.currentTurnScore().total);
  undoDisabled = computed(() => !this.gameService.currentTurnScore().turns.length || this.finishedSignal());
  bankDisabled = computed(() => this.gameService.currentTurnScore().total <= 0 || this.finishedSignal());
  farkleDisabled = computed(() => this.finishedSignal());
  finishedSignal = signal(false);

  addScore(option: ScoringOption): void {
    this.gameService.addToCurrentTurn(option.points);
  }

  bank(): void {
    const points = this.gameService.currentTurnScore().total;
    this.gameService.bank();
    const dialog = this.dialog.open(ResultsDialogComponent, {
      data: { type: 'bank', points },
      width: '400px',
      disableClose: true
    });
    this.finished(dialog);
  }

  farkle(): void {
    this.gameService.farkle();
    const dialog = this.dialog.open(ResultsDialogComponent, {
      data: { type: 'farkle', points: 0 },
      width: '400px',
      disableClose: true
    });
    this.finished(dialog);
  }

  undo(): void {
    this.gameService.undo();
  }

  finished(dialog: MatDialogRef<ResultsDialogComponent>): void {
    this.finishedSignal.set(true);timer(5000).pipe(switchMap(() => {
      dialog.close();
      return this.router.navigate(['/scorecard']);
    })).subscribe();
  }
}
