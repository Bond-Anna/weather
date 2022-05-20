import * as yup from 'yup'

export const generalSchema = yup
  .object({
    firstName: yup
      .string()
      .required('Enter your first name')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    lastName: yup
      .string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Enter your last name')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
      ),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$/,
        'Must include an uppercase letter, a lowercase letter, a number, and a special character'
      )
      .required('Password is required'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Passwords must match'),
    calendar: yup.string().required('Choose your date of birth'),
    country: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .required(),
    address: yup
      .string()
      .min(10, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Address is required'),
    address2: yup
      .string()
      .min(10, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Address2 is required'),
    city: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('City is required'),
    state: yup.string().required('State is required'),
    code: yup.string().matches(/[0-9]/, 'Zip Code must include only numbers').required(),
    jobTitle: yup.string(),
    company: yup.string(),
    website: yup.string(),
  })
  .required()
