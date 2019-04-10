// @flow
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { map } from 'ramda';
import { API_URL } from '../config';
import { ROUTES } from '../constants';
import type { Event } from '../flow-types';

type Props = {
  history: any,
};

const renderEvent = (evt: Event) => {
  const { id, name } = evt;
  return <div key={id}>{name}</div>;
};

const EventsContainer = (props: Props) => {
  const { history: h } = props;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${API_URL}/dt-events/next`;
    axios
      .get(url)
      .then(({ data }) => {
        setEvents(data);

        // login(data.token);
        // h.push(ROUTES.home);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return <h1>loading</h1>;
  }

  return <div>{map(renderEvent, events)}</div>;
};

export default withRouter(EventsContainer);
