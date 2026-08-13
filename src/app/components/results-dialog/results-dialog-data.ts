const POINTS_PLACEHOLDER = '{POINTS}';

const BANKING_GENERAL = [
  `You banked ${POINTS_PLACEHOLDER} points!`
] as const;

const BANKING_LOW = [
  ...BANKING_GENERAL,
  'Lame',
  'If I broke every bone in your hand, could you still do that?',
  'Did you get a group rate or something?',
  `You've gotta walk before you crawl.`,
  `Why are you such a wet sandwich?`,
  `I'm just going to put dirt in my ears.`
] as const;

const BANKING_HIGH = [
  ...BANKING_GENERAL,
  'Good roll, good roll.',
  `NOW THAT'S A LOT OF DAMAGE!`,
  'Do you know what Chuck Berry said every night before counting 1, 2, 3, 4?',
  'Anybody want a peanut?',
  'A titanium card! How the cuss are you qualified for that?',
  `The house safe is for brandy and grandmother's pearls.`
] as const;

const FARKLE = [
  `You'll get nothing and like it!`,
  `Respect the 2's`,
  'Nice one dips...',
  'You fell victim to one of the classic blunders!',
  `You're in a puddle of shit and you don't have the shoes for it.`,
  'Inconceivable!',
  `You've got one foot in the grave and three feet on a banana peel.`
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
