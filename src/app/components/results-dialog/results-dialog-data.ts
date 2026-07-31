const POINTS_PLACEHOLDER = '{POINTS}';

const BANKING_GENERAL = [
  `You banked ${POINTS_PLACEHOLDER} points!`
] as const;

const BANKING_LOW = [
  ...BANKING_GENERAL,
  'Lame'
] as const;

const BANKING_HIGH = [
  ...BANKING_GENERAL,
  'Good roll, good roll.',
  `NOW THAT'S A LOT OF DAMAGE!`
] as const;

const FARKLE = [
  `You'll get nothing and like it!`,
  `Respect the 2's`,
  'Nice one dips...'
] as const;

export interface ResultsDialogData {
  type: 'bank' | 'farkle' | 'frf';

  points: number;
}

export function getMessage(data: ResultsDialogData): string {
  let messages: readonly string[];
  switch (data.type) {
    case 'bank':
      messages = data.points < 600 ? BANKING_LOW : BANKING_HIGH;
      break;
    case 'frf':
    case 'farkle':
      messages = FARKLE;
      break;
  }
  const random = Math.floor(Math.random() * messages.length);
  return messages[random].replace(POINTS_PLACEHOLDER, data.points.toString());
}
