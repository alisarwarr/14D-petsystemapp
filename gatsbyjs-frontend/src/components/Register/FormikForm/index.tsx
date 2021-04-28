import React from 'react';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//SWEETALERT2
import { successAlert } from '../../../alerts';
//SHORTID
import shortid from 'shortid';
//FORMIK & YUP
import { Formik, ErrorMessage } from 'formik';
import { object } from 'yup';
import { initialValues, validationObj } from './FormikData';
//CONTEXT-API
import { useStateValue } from '../../../StateContext';
//GATSBY
import { navigate } from 'gatsby';
//APPSYNC
import { handleCreate } from '../../../appsync';

const process = (timeout: any) => new Promise(() => timeout);

function FormikForm() {
    const [ { dark }, dispatch ] = useStateValue();
    const screen550 = useMediaQuery('(min-width:550px)');

    return (
        <div className="formikform">
            <Formik
                initialValues={initialValues}
                validationSchema={object(validationObj)}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                  //creating unique path                                
                    let id = shortid.generate();
            
                    const willOccur = setTimeout(() => {
                        resetForm();
                        setSubmitting(false);
                      //calling functions after secs
                        handleCreate({ ...values, id });
                        navigate(`/`);
                        successAlert();
                    }, 1500);
                    
                    await process(willOccur);
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form
                        onSubmit={handleSubmit}                               //formik's
                        autoComplete="off"
                        id={dark ? "darkRespectAll" : "lightRespectAll"}
                    >
                        <table>
                            <tbody>
                                <tr className="input-group input-group-sm">
                                    <th><label> Animal </label></th>
                                    <td>
                                        <select
                                            name='petAnimal'
                                            value={values.petAnimal}          //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            className="custom-select"
                                        >
                                            <option value=""    label="Pet Animal"/>
                                            <option value="CAT" label="CAT"       />
                                            <option value="DOG" label="DOG"       />
                                        </select>
                                        <ErrorMessage name='petAnimal' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="input-group input-group-sm">
                                    <th><label> Color </label></th>
                                    <td>
                                        <select
                                            name='petColor'
                                            value={values.petColor}           //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            className="custom-select"
                                        >
                                            <option value=""      label="Pet Color"/>
                                            <option value="WHITE" label="WHITE"    />
                                            <option value="BLACK" label="BLACK"    />
                                            <option value="BROWN" label="BROWN"    />
                                        </select>
                                        <ErrorMessage name='petColor' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="input-group input-group-sm">
                                    <th><label> Name </label></th>
                                    <td>
                                        <input
                                            name='petName'
                                            value={values.petName}            //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            type="text"
                                            placeholder="Pet Name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name='petName' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="input-group input-group-sm">
                                    <th><label> Age </label></th>
                                    <td>
                                        <input
                                            name='petAge'
                                            value={values.petAge}             //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            type="number"
                                            placeholder="Pet Age"
                                            className="form-control"
                                        />
                                        <ErrorMessage name='petAge' component="p" className="err"/>
                                    </td>
                                </tr>
                
                                <tr className="input-group input-group-sm">
                                    <th><label> Gender </label></th>
                                    <td>
                                        <select
                                            name='petGender'
                                            value={values.petGender}          //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            className="custom-select"
                                        >
                                            <option value=""       label="Pet Gender"/>
                                            <option value="MALE"   label="MALE"      />
                                            <option value="FEMALE" label="FEMALE"    />
                                        </select>
                                        <ErrorMessage name='petGender' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="input-group input-group-sm">
                                    <th><label> Weight </label></th>
                                    <td>
                                        <input
                                            name='petWeight'
                                            value={values.petWeight}          //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            type="number"
                                            placeholder="Pet Weight"
                                            className="form-control"
                                        />
                                        <ErrorMessage name='petWeight' component="p" className="err"/>
                                    </td>
                                </tr>
                
                                <tr className="input-group input-group-sm">
                                    <th><label> Condition </label></th>
                                    <td>
                                        <select
                                            name='petCondition'
                                            value={values.petCondition}       //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            className="custom-select"
                                        >
                                            <option value=""          label="Pet Condition"/>
                                            <option value="EXCELLENT" label="EXCELLENT"   />
                                            <option value="GOOD"      label="GOOD"        />
                                            <option value="BAD"       label="BAD"         />
                                        </select>
                                        <ErrorMessage name='petCondition' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="input-group input-group-sm">
                                    <th><label> Owner Name </label></th>
                                    <td>
                                        <input
                                            name='petOwnerName'
                                            value={values.petOwnerName}       //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            type="text"
                                            placeholder="Pet Owner Name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name='petOwnerName' component="p" className="err"/>
                                    </td>
                                </tr>
        
                                <tr className="input-group input-group-sm">
                                    <th><label> Owner Email </label></th>
                                    <td>
                                        <input
                                            name='petOwnerEmail'
                                            value={values.petOwnerEmail}      //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            type="text"
                                            placeholder="Pet Owner Email"
                                            className="form-control"
                                        />
                                        <ErrorMessage name='petOwnerEmail' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="input-group input-group-sm">
                                    <th><label> Owner Phone </label></th>
                                    <td>
                                        <input
                                            name='petOwnerPhone'
                                            value={values.petOwnerPhone}      //formik's
                                            onChange={handleChange}           //formik's
                                            onBlur={handleBlur}               //formik's
                                            type="number"
                                            placeholder="Pet Owner Phone"
                                            className="form-control"
                                        />
                                        <ErrorMessage name='petOwnerPhone' component="p" className="err"/>
                                    </td>
                                </tr>

                                <tr className="trBtn">
                                    <Button type='submit' disabled={isSubmitting} disableRipple size={screen550 ? "medium" : "small"} fullWidth>
                                        <span><span>SUBMIT</span> { isSubmitting && <div className="spinner-border spinner-border-sm" role="status" style={{ marginLeft: "0.325rem", width: "0.725rem", height: "0.725rem" }}> <span className="sr-only">Loading...</span> </div> }</span>
                                    </Button>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                )}
            </Formik>

            <button
                className={`btn btn-lg btn-block btn-outline-${dark ? `info` : `dark` }`}
                onClick={() => navigate('/')}
                id="btnhomepage"
            >
                <HomeIcon fontSize="small"/> <span style={{ marginLeft: "0.375rem" }}> Home Page </span>
            </button>
        </div>
    )
}

export default FormikForm;