// @flow
import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Portal } from 'react-portal';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Title } from './Common';
import { BigInput, Button } from '../../Common';
import EventTypeSelector from './EventTypeSelector';
import EventDateSelector from './EventDateSelector';
import EventBox from '../EventBox';
import { EVENT_TYPES } from '../../../constants';
import { colors } from '../../../util/themeAx';
import { typeFromEvent } from '../../../util';

import type { EventCategory, FormikBag } from '../../../flow-types';

type vals = {
  title: string,
  subtitle: string,
  time: string,
  address: string,
  date: string,
  type: EventCategory,
};

type Props = {
  ...FormikBag,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmit: (values: vals, formikBag: FormikBag) => void,
  onCancel: () => void,
};

// eslint-disable-next-line react/prop-types
const CustomError = ({ children }) => {
  return (
    <Text color="red" fontWeight="bold">
      {children}
    </Text>
  );
};

const Mando = styled.span`
  color: ${props => props.theme.colors.red};
`;

const Wrapper = styled(Box)`
  position: relative;
`;

const PreviewOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: ${props => (props.visible ? 'flex' : 'none')};
  background: black;
`;

const Divider = styled.div`
  border-top: 1px solid ${colors('lightestgrey')};
  margin-bottom: 8px;
  width: 90%;
  text-align: center;
  margin: 0 auto 8px auto;
`;

const Creator = (props: Props) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    onCancel,
    isValid,
    submitForm,
  } = props;

  const [showPreview, setShowPreview] = useState(false);

  const onPreview = () => {
    if (!isValid) {
      submitForm();
      return;
    }

    setShowPreview(true);
  };

  const previewEvent = {
    ...values,
    participants: [],
    type: typeFromEvent(values.type),
  };

  const onCreateEvent = () => {
    setShowPreview(false);
    submitForm();
  };

  return (
    <Wrapper>
      <Portal>
        <PreviewOverlay bg="transparentBlack" visible={showPreview}>
          <Flex alignItems="center" justifyContent="center">
            <EventBox
              event={previewEvent}
              preview
              fullyOpen
              onCancelClick={() => setShowPreview(false)}
              onCreateEventClick={onCreateEvent}
            />
          </Flex>
        </PreviewOverlay>
      </Portal>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContert="space-between"
      >
        <Title>Luo tapahtuma</Title>
        <form onSubmit={handleSubmit}>
          <Box>
            <Text textAlign="center" m={2} color="darkgrey">
              valitse tyyppi <Mando>*</Mando>
            </Text>
            <Divider />
            <EventTypeSelector
              preSelected={values.type}
              onEventClick={category => {
                setFieldValue('type', category);
              }}
              eventTypes={EVENT_TYPES}
            />
            <Flex m={2} justifyContent="center">
              <ErrorMessage name="type" component={CustomError} />
            </Flex>
          </Box>
          <Box width="100%" m={2}>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <BigInput
                size={25}
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.title}
                placeholder="anna tapahtuman nimi *"
              />
              <ErrorMessage name="title" component={CustomError} />
            </Flex>
          </Box>
          <Box width="100%" m={2}>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <BigInput
                size={20}
                name="subtitle"
                value={values.subtitle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.subtitle}
                placeholder="anna tarkenne"
              />
              <ErrorMessage name="subtitle" component={CustomError} />
            </Flex>
          </Box>
          <Box
            m={2}
            width="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Divider />
            <EventDateSelector
              label="Valitse päivämäärä *"
              onSetDateClick={date => {
                setFieldValue('date', date);
              }}
              preSelected={values.date}
            />
            <Flex m={2} justifyContent="center">
              <ErrorMessage name="date" component={CustomError} />
            </Flex>
          </Box>
          <Box width="100%" m={2}>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <BigInput
                size={20}
                name="time"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.time}
                placeholder="anna aika, esim 10:00.."
              />
              <ErrorMessage name="time" component={CustomError} />
            </Flex>
          </Box>
          <Box width="100%" m={2}>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <BigInput
                size={20}
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
                placeholder="anna osoite tai paikka"
              />
              <ErrorMessage name="address" component={CustomError} />
            </Flex>
          </Box>

          <Flex mt={4} justifyContent="center" flexWrap="wrap">
            <Button onClick={onCancel} m={2} width={130} type="button">
              Peruuta
            </Button>
            <Button
              m={2}
              width={130}
              type="button"
              onClick={onPreview}
              variant="primary"
              justifyContent="center"
            >
              Esikatsele
            </Button>
          </Flex>
        </form>
      </Flex>
    </Wrapper>
  );
};

export const formikProps = {
  mapPropsToValues: () => ({
    subtitle: '',
    title: '',
    date: '',
    address: '',
    time: '',
    type: '',
  }),

  validationSchema: Yup.object().shape({
    title: Yup.string().required('Anna tapahtuman nimi'),
    date: Yup.string().required('Anna päivämäärä'),
    type: Yup.string().required('Valitse tapahtuman tyyppi'),
  }),

  displayName: 'Creator',
};

export default Creator;
