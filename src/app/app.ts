import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ConfirmDialogComponent } from '@app/components/confirm-dialog';
import { GameService } from '@app/services';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  router = inject(Router);
  dialog = inject(MatDialog);
  gameService = inject(GameService);

  toggleEditMode(): void {
    this.router.navigate(['/scorecard']).then(() => {
      this.gameService.toggleEditMode.next();
    });
  }

  openNewGameDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Start New Game?',
        message: 'Are you sure you want to start a new game?',
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameService.newGame();
      }
    });
  }
}
