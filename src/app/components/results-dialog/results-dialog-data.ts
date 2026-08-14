const BANKING_LOW = [
  'Lame',
  'If I broke every bone in your hand, could you still do that?',
  'Did you get a group rate or something?',
  `You've gotta walk before you crawl.`,
  `Why are you such a wet sandwich?`,
  `I'm just going to put dirt in my ears.`,
  'Nickel Dimer',
  `You're good. You're good. You're good.`,
  `That's his eager face...`,
  'Here put this bandit hat on.'
] as const;

const BANKING_HIGH = [
  'Good roll, good roll.',
  `NOW THAT'S A LOT OF DAMAGE!`,
  'Do you know what Chuck Berry said every night before counting 1, 2, 3, 4?',
  'Anybody want a peanut?',
  'A titanium card! How the cuss are you qualified for that?',
  `The house safe is for brandy and grandmother's pearls.`,
  'Who is this guy?!',
  `I'd like to personally show you, my ass.`,
  'Waiting on you now.'
] as const;

const FARKLE = [
  `You'll get nothing and like it!`,
  `Respect the 2's`,
  'Nice one dips...',
  'You fell victim to one of the classic blunders!',
  `You're in a puddle of shit and you don't have the shoes for it.`,
  'Inconceivable!',
  `You've got one foot in the grave and three feet on a banana peel.`,
  'You tosser! You had one job to do!',
  `You're such an idiot!`,
  'You have got 29 minutes to come up with a proper apology.'
] as const;

export interface ResultsDialogData {
  type: 'bank' | 'farkle';

  points: number;
}

export function getMessage(data: ResultsDialogData): string {
  let messages: readonly string[];
  switch (data.type) {
    case 'bank':
      messages = data.points < 750 ? BANKING_LOW : BANKING_HIGH;
      break;
    case 'farkle':
      messages = FARKLE;
      break;
  }
  return messages[Math.floor(Math.random() * messages.length)];
}
