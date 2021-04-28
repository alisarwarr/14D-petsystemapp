import React from 'react';
//COMPONENTS
import Head from '../Head';
import FormikForm from './FormikForm';

function Register() {
    return (
        <>
            <Head title="Register"/>
            <div className="register">
                <div>
                    <div className="body">
                        <FormikForm
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;