import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog';
import { GameService } from './services/game';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    public gameService: GameService
  ) {}

  openNewGameDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Start New Game?',
        message: 'Are you sure you want to start a new game? All previous scores will be discarded.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameService.newGame();
        this.router.navigate(['/scorecard']);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
