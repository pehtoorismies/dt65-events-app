const EVENT_TYPES = [
  {
    type: 'cycling',
    title: 'Pyöräily',
  },
  {
    type: 'running',
    title: 'Juoksu',
  },
  {
    type: 'orienteering',
    title: 'Suunnistus',
  },
  {
    type: 'track-running',
    title: 'Ratajuoksu',
  },
  {
    type: 'spinning',
    title: 'Spinning',
  },
  {
    type: 'triathlon',
    title: 'Triathlon',
  },
  {
    type: 'swimming',
    title: 'Uinti',
  },
  {
    type: 'ultras',
    title: 'Ultras',
  },
  {
    type: 'other',
    title: 'Muu',
  },
];

const WEEK_DAYS = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];

const ROUTES = {
  login: '/login',
  home: '/',
  profile: '/profile',
  forgotPassword: '/forgot-password',
  createEvent: '/create-event',
};

export { EVENT_TYPES, WEEK_DAYS, ROUTES };
