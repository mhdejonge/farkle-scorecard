import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { getMessage, ResultsDialogData } from './results-dialog-data';

@Component({
  selector: 'app-results-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './results-dialog.html',
  styleUrl: './results-dialog.scss'
})
export class ResultsDialogComponent implements OnInit {
  isBanking!: boolean;
  title!: string;
  description!: string;
  pointsDisplay!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ResultsDialogData) {}

  ngOnInit(): void {
    this.isBanking = this.data.type === 'bank';
    this.description = getMessage(this.data);
    switch (this.data.type) {
      case 'bank':
        this.title = 'Banked!';
        this.pointsDisplay = `+${this.data.points}`;
        break;
      case 'farkle':
        this.title = 'Farkle!';
        this.pointsDisplay = '+0';
        break;
      case 'frf':
        this.title = 'First Roll Farkle!';
        this.pointsDisplay = this.data.points.toString();
        break;
    }
  }
}
