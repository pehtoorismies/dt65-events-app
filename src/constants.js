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

const EVENTS_PATH = '/events';

const ROUTES = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  home: '/',
  events: EVENTS_PATH,
  event: `${EVENTS_PATH}/:id`,
  profile: '/profile',
  forgotPassword: '/forgot-password',
  createEvent: '/create-event',
  notFound: '/404',
};

export { EVENT_TYPES, WEEK_DAYS, ROUTES };
