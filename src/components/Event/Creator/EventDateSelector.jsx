// @flow
import React, { useState } from 'react';
import DatePicker from 'react-mobile-datepicker';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { format, getDay } from 'date-fns';
import { WEEK_DAYS } from '../../../constants';

type Props = {
  onSetDateClick: (value: any) => void,
  preSelected?: any,
};

const DateBox = styled(Flex)`
  cursor: pointer;
  border-radius: 8px;
`;

const monthMap = {
  '1': 'Tammikuu',
  '2': 'Helmikuu',
  '3': 'Maaliskuu',
  '4': 'Huhtikuu',
  '5': 'Toukokuu',
  '6': 'Kesäkuu',
  '7': 'Heinäkuu',
  '8': 'Elokuu',
  '9': 'Syyskuu',
  '10': 'Lokakuu',
  '11': 'Marraskuu',
  '12': 'Joulukuu',
};

const dateConfig = {
  year: {
    format: 'YYYY',
    caption: 'Vuosi',
    step: 1,
  },
  month: {
    format: value => monthMap[value.getMonth() + 1],
    caption: 'Kuukausi',
    step: 1,
  },
  date: {
    format: 'DD',
    caption: 'Päivä',
    step: 1,
  },
};

const EventDateSelector = (props: Props) => {
  const { preSelected, onSetDateClick } = props;
  const theDate = preSelected || new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [eventDate, setEventDate] = useState(theDate);

  const okClick = date => {
    setIsOpen(false);
    setEventDate(date);
    onSetDateClick(date);
  };

  const showText = preSelected ? (
    <Text color="white" fontSize={16} fontWeight="bold">
      {WEEK_DAYS[getDay(eventDate)]} {format(eventDate, `DD.MM.YYYY`)}
    </Text>
  ) : (
    <Text color="white" fontSize={16} fontWeight="bold">
      Valitse päivä
    </Text>
  );
  const bg = preSelected ? 'pink' : 'blue';

  return (
    <React.Fragment>
    <Flex flexDirection="column" alignItems="center">
      <DateBox onClick={() => setIsOpen(true)} bg={bg} p={3}>
        {showText}
      </DateBox>

      <Box bg="pink">
        <DatePicker
          showCaption
          showHeader
          dateConfig={dateConfig}
          value={eventDate}
          theme="ios"
          isOpen={isOpen}
          // min={new Date()}
          headerFormat="DD.MM.YYYY"
          confirmText="OK"
          cancelText="Cancel"
          onSelect={okClick}
          onCancel={() => setIsOpen(false)}
        />
      </Box>
    </Flex>
    </React.Fragment>
  );
};


EventDateSelector.defaultProps = {
  preSelected: null,
}

export default EventDateSelector;
