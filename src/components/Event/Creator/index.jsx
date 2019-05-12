// @flow
import React, { useState } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import StepType from './StepType';
import StepTitle from './StepTitle';
import StepDate from './StepDate';
// import StepDescription from './StepDescription';
import StepPreview from './StepPreview';
import { typeFromEvent } from '../../../util';

import type { EventCategory } from '../../../flow-types';

type EventState = {
  title?: string,
  subtitle?: string,
  time?: string,
  address?: string,
  date?: string,
  type?: EventCategory,
};

type Props = {
  onSubmit: (values: EventState) => void,
};

const Wrapper = styled(Box)`
  position: relative;
`;

const renderStep = (step, setStep, eventState, setEventState, onSubmit) => {
  if (step === 'type') {
    const config = {
      handleFormSubmit: (type, race) => {
        setEventState({
          ...eventState,
          type,
          race,
        });
        setStep('title');
      },
      ...eventState,
    };
    return <StepType {...config} />;
  }
  if (step === 'title') {
    const config = {
      handleFormSubmit: (title, subtitle) => {
        setEventState({
          ...eventState,
          title,
          subtitle,
        });
        setStep('date');
      },
      onPrevClick: () => setStep('type'),
      ...eventState,
    };
    return <StepTitle {...config} />;
  }
  if (step === 'date') {
    const config = {
      handleFormSubmit: (date, time) => {
        setEventState({
          ...eventState,
          date,
          time,
        });
        setStep('preview');
      },
      onPrevClick: () => setStep('title'),
      ...eventState,
    };
    return <StepDate {...config} />;
  }
  if (step === 'preview') {
    const config = {
      onCreateClick: () => {
        onSubmit(eventState);
      },
      onPrevClick: () => setStep('date'),
      event: {
        ...eventState,
        participants: [],
        type: typeFromEvent(eventState.type),
      },
    };
    return <StepPreview {...config} />;
  }
  return 'unknown step';
};

const Creator = (props: Props) => {
  const { onSubmit } = props;

  const [step, setStep] = useState('type');
  const [eventState, setEventState] = useState<EventState>({
    title: '',
    subtitle: '',
    time: '',
    race: false,
    description: '',
  });

  return (
    <Wrapper>
      <Box>
        {renderStep(step, setStep, eventState, setEventState, onSubmit)}
      </Box>
    </Wrapper>
  );
};

export default Creator;
