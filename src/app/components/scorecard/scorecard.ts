import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GameService, ScoreCard } from '@app/services';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-scorecard',
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './scorecard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './scorecard.scss',
})
export class ScorecardComponent implements OnInit {
  scoreCard$: Observable<ScoreCard>;

  constructor(
    private gameService: GameService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.scoreCard$ = this.gameService.scoreCard$;
  }

  ngOnInit(): void {}

  openNewGameDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Start New Game?',
        message:
          'Are you sure you want to start a new game? All previous scores will be discarded.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameService.newGame();
        this.router.navigate(['/scorecard']);
      }
    });
  }
}
