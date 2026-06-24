// Affiliate / referral links. These are how the app earns money tastefully —
// helpful travel services shown once, never spammy.
//
// TO ACTIVATE: sign up for each program (free), then paste your referral URL
// into `url`. Keep `enabled: false` until you have real links so it stays hidden.
export const AFFILIATE = {
  enabled: false, // flip to true once you've added your real referral URLs
  items: [
    {
      id: 'esim',
      icon: '📶',
      title: 'Travel eSIM',
      sub: 'Cheap mobile data abroad',
      url: 'https://www.airalo.com/', // TODO: your Airalo referral link
    },
    {
      id: 'card',
      icon: '💳',
      title: 'Travel money card',
      sub: 'Skip bad exchange rates',
      url: 'https://wise.com/', // TODO: your Wise referral link
    },
  ],
};
