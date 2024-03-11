import React, { useState, useEffect } from 'react';
import { Patient, getPatient } from '../api/PatientAPI';

const TeamMember = () => {
    const [patient, setPatient] = useState<Patient>(); 

    useEffect(() => {
        fetchPatients();
    }, []); 

    const fetchPatients = async () => {
        await getPatient(1)
            .then(patient => setPatient(patient))
            .catch(error => console.error('Fail', error));
    };

    return (
        <>
            <h4> Patrick, Lupe, Cristian, Ultra</h4>
            <h4 key={patient?.id}>{patient?.f_name} {patient?.l_name} {patient?.address}</h4>
        </>
    );
};

export default TeamMember;
