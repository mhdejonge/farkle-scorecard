import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '@app/services';
import { ConfirmDialogComponent } from '@app/components/confirm-dialog';

@Component({
  selector: 'app-scorecard',
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './scorecard.html',
  styleUrl: './scorecard.scss'
})
export class ScorecardComponent {
  constructor(readonly gameService: GameService, private dialog: MatDialog) {}

  openNewGameDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Start New Game?',
        message: 'Are you sure you want to start a new game?'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameService.newGame();
      }
    });
  }
}
