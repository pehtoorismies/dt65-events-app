const EVENT_TYPES = [
  {
    type: 'Cycling',
    title: 'Pyöräily',
    img: 'cycling',
  },
  {
    type: 'Running',
    title: 'Juoksu',
    img: 'running',
  },
  {
    type: 'Orienteering',
    title: 'Suunnistus',
    img: 'orienteering',
  },
  {
    type: 'TrackRunning',
    title: 'Ratajuoksu',
    img: 'track-running',
  },
  {
    type: 'Spinning',
    title: 'Spinning',
    img: 'spinning',
  },
  {
    type: 'Triathlon',
    title: 'Triathlon',
    img: 'triathlon',
  },
  {
    type: 'Swimming',
    title: 'Uinti',
    img: 'swimming',
  },
  {
    type: 'Ultras',
    title: 'Ultras',
    img: 'swimming',
  },
  {
    type: 'Other',
    title: 'Muu',
    img: 'other',
  },
  {
    type: 'Skiing',
    title: 'Hiihto',
    img: 'skiing',
  },
  {
    type: 'Karonkka',
    title: 'Karonkka',
    img: 'karonkka',
  },
  {
    type: 'Meeting',
    title: 'Kokous',
    img: 'meeting',
  },
];

const WEEK_DAYS = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];

const EVENTS_PATH = '/events';

const GRAPHQL_TYPES = {
  LOCAL_USER: 'LocalUser',
}

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

export { EVENT_TYPES, WEEK_DAYS, ROUTES, GRAPHQL_TYPES };
