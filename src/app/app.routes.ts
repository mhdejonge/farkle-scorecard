import { Routes } from '@angular/router';
import { ScorecardComponent } from './components/scorecard/scorecard';
import { TurnComponent } from './components/turn/turn';

export const routes: Routes = [
  { path: '', redirectTo: '/scorecard', pathMatch: 'full' },
  { path: 'scorecard', component: ScorecardComponent },
  { path: 'turn', component: TurnComponent },
];
