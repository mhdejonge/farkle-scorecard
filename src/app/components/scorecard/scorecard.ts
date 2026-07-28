import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { GameService, ScoreCard } from '@app/services';

@Component({
  selector: 'app-scorecard',
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './scorecard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './scorecard.scss',
})
export class ScorecardComponent implements OnInit {
  scoreCard$: Observable<ScoreCard>;

  constructor(private gameService: GameService) {
    this.scoreCard$ = this.gameService.scoreCard$;
  }

  ngOnInit(): void {}
}
