// @flow
import * as Yup from 'yup';

const registerFormikProps = {
  mapPropsToValues: () => {
    return {
      email: '',
      username: '',
      name: '',
      password: '',
      passwordRepeat: '',
      registerSecret: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Pakollinen kenttä')
      .email('Tarkista sähköpostiosoite'),
    username: Yup.string().required('Pakollinen kenttä'),
    name: Yup.string().required('Pakollinen kenttä'),
    password: Yup.string().required('Pakollinen kenttä'),
    passwordRepeat: Yup.string()
      .required('Pakollinen kenttä')
      .oneOf([Yup.ref('password'), null], 'Salasanojen tulee olla samat'),
    registerSecret: Yup.string().required('Pakollinen kenttä'),
  }),
  // handleSubmit: (values, props) => {
  //   const {
  //     props: { handleFormSubmit },
  //   } = props;

  //   const formikBag: FormikBag = omit(['props'], props);
  //   handleFormSubmit(values, formikBag);
  // },

  displayName: 'RegisterForm',
}

export default registerFormikProps;