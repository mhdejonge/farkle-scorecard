import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { GameService } from '../../services/game';

interface ScoringOption {
  label: string;
  points: number;
}

@Component({
  selector: 'app-turn',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './turn.html',
  styleUrl: './turn.scss',
})
export class TurnComponent implements OnInit {
  currentTurnScore$: Observable<number>;

  constructor(private gameService: GameService) {
    this.currentTurnScore$ = this.gameService.currentTurnScore$;
  }

  scoringOptions: ScoringOption[] = [
    { label: 'Single 1', points: 100 },
    { label: 'Single 5', points: 50 },
    { label: 'Three 1s', points: 300 },
    { label: 'Three 2s', points: 200 },
    { label: 'Three 3s', points: 300 },
    { label: 'Three 4s', points: 400 },
    { label: 'Three 5s', points: 500 },
    { label: 'Three 6s', points: 600 },
    { label: 'Four 1s', points: 1000 },
    { label: 'Four 2s', points: 800 },
    { label: 'Four 3s', points: 1200 },
    { label: 'Four 4s', points: 1600 },
    { label: 'Four 5s', points: 2000 },
    { label: 'Four 6s', points: 2400 },
    { label: 'Five 1s', points: 3000 },
    { label: 'Five 2s', points: 2000 },
    { label: 'Five 3s', points: 3000 },
    { label: 'Five 4s', points: 4000 },
    { label: 'Five 5s', points: 5000 },
    { label: 'Five 6s', points: 6000 },
    { label: 'Straight (1-6)', points: 1500 },
    { label: 'Three Pair', points: 750 },
    { label: 'Pair of 1s', points: 200 },
    { label: 'Pair of 5s', points: 100 },
  ];

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
