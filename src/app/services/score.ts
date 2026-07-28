export interface ScoringOption {
  label: string;
  points: number;
}

export const ScoringOptions: ScoringOption[] = [
  {
    label: 'Single 1',
    points: 100
  },
  {
    label: 'Single 5',
    points: 50
  },
  {
    label: 'Three 1s',
    points: 300
  },
  {
    label: 'Three 2s',
    points: 200
  },
  {
    label: 'Three 3s',
    points: 300
  },
  {
    label: 'Three 4s',
    points: 400
  },
  {
    label: 'Three 5s',
    points: 500
  },
  {
    label: 'Three 6s',
    points: 600
  },
  {
    label: 'Four of a Kind',
    points: 1000
  },
  {
    label: 'Five of a Kind',
    points: 2000
  },
  {
    label: 'Six of a Kind',
    points: 3000
  },
  {
    label: 'Straight (1-6)',
    points: 1500
  },
  {
    label: 'Triple Double',
    points: 1500
  },
  {
    label: 'Double Triple',
    points: 2500
  }
] as const;
