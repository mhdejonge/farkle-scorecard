import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { GameService } from '@app/services';

@Component({
  selector: 'app-scorecard',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './scorecard.html',
  styleUrl: './scorecard.scss'
})
export class ScorecardComponent implements OnInit {
  isEditMode = signal(false);
  editableTurns = signal<string[]>([]);
  editableTotal = computed(() => this.editableTurns().reduce((sum, turn) => sum + (parseInt(turn, 10) || 0), 0));

  constructor(readonly gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.toggleEditMode.subscribe(() => {
      this.editableTurns.set(this.gameService.scoreCard().turns.map((turn) => turn.toString()));
      this.isEditMode.set(true);
    });
  }

  exitEditMode(): void {
    this.isEditMode.set(false);
    this.editableTurns.set([]);
  }

  removeTurn(remove: number): void {
    this.editableTurns.update((turns) => turns.filter((_, index) => index !== remove));
  }

  saveScorecard(): void {
    const turns = this.editableTurns()
      .map((turn) => parseInt(turn, 10))
      .filter((turn) => !isNaN(turn));
    const total = turns.reduce((sum, turn) => sum + turn, 0);
    this.gameService.saveScoreCard({ turns, total });
    this.exitEditMode();
  }
}
