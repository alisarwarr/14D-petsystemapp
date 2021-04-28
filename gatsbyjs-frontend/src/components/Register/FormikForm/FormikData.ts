import { string, number } from 'yup';

export const initialValues = {
    petAnimal: '',
    petColor: '',
    petName: '',
    petAge: '',
    petGender: '',
    petWeight: '',
    petCondition: '',
    petOwnerName: '',
    petOwnerEmail: '',
    petOwnerPhone: '',
}

export const validationObj = {
    petAnimal: string()
    .required('Must be filled'),

    petColor: string()
    .required('Must be filled'),

    petName: string()
    .max(30, 'Must be atmost 30 characters')
    .min(3, 'Must have atleast 3 characters')
    .required('Must be filled'),

    petAge: number()
    .integer()
    .default(0)
    .max(60, 'Must be atmost 60 years')
    .min(1, 'Must be atleast 1 year')
    .required('Must be filled'),

    petGender: string()
    .required('Must be filled'),

    petWeight: string()
    .required('Must be filled'),

    petCondition: string()
    .required('Must be filled'),

    petOwnerName: string()
    .max(30, 'Must be atmost 30 characters')
    .min(3, 'Must have atleast 3 characters')
    .required('Must be filled'),

    petOwnerEmail: string()
    .email('Must be a valid email')
    .required('Must be filled'),

    petOwnerPhone: string()
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
    .required('Must be filled')
}