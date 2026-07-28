import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { GameService, ScoringOption, ScoringOptions } from '@app/services';

@Component({
  selector: 'app-turn',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './turn.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './turn.scss',
})
export class TurnComponent implements OnInit {
  currentTurnScore$: Observable<number>;

  constructor(private gameService: GameService) {
    this.currentTurnScore$ = this.gameService.currentTurnScore$;
  }

  scoringOptions = ScoringOptions;

  ngOnInit(): void {}

  addScore(option: ScoringOption): void {
    this.gameService.addToCurrentTurn(option.points);
  }

  bankTurn(): void {
    this.gameService.bankTurn();
  }

  farkle(): void {
    this.gameService.farkle();
  }
}
