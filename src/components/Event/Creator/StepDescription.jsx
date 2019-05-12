// @flow
import React from 'react';
import { Flex, Box } from 'rebass';
import { ErrorMessage, withFormik } from 'formik';
import Editor from './Editor' 
import {  Button } from '../../Common';


import type { FormikBag } from '../../../flow-types';

type vals = {
  title: string,
  subtitle: string,
};

type Props = {
  ...FormikBag,
  // eslint-disable-next-line react/no-unused-prop-types
  handleFormSubmit: (title: string, subtitle?: string) => void,
  onPrevClick: () => void,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
};

const TypeDescription = (props: Props) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    onPrevClick,
  } = props;

  // const [editorState, setEditorState] = React.useState(
  //   EditorState.createEmpty()
  // );

  return (
    <form onSubmit={handleSubmit}>
      <Editor
       
      />

      <Flex justifyContent="center">
        <Button onClick={onPrevClick} type="button" m={2}>
          Vaihda tyyppi
        </Button>
        <Button type="submit" m={2}>
          Seuraava
        </Button>
      </Flex>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ description }) => ({
    description,
  }),
  handleSubmit: ({ description }, { props: { handleFormSubmit } }) => {
    handleFormSubmit(description);
  },

  displayName: 'Description',
})(TypeDescription);
