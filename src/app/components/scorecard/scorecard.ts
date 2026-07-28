import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { GameService, ScoreCard } from '../../services/game';

@Component({
  selector: 'app-scorecard',
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './scorecard.html',
  styleUrl: './scorecard.scss',
})
export class ScorecardComponent implements OnInit {
  scoreCard$: Observable<ScoreCard>;

  constructor(private gameService: GameService) {
    this.scoreCard$ = this.gameService.scoreCard$;
  }

  ngOnInit(): void {}
}
