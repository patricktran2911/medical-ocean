import React, { useState, useEffect } from 'react';
import { Patient, getAllPatients } from '../api/PatientAPI';
import { Stack } from '@mui/material';

const TeamMember = () => {
    const [patients, setPatient] = useState<Patient[]>([]); 

    useEffect(() => {
        fetchPatients();
    }, []); 

    const fetchPatients = async () => {
        await getAllPatients()
            .then(patients => setPatient(patients))
            .catch(error => console.error('Fail', error));
    };

    return (
        <Stack direction={ 'column' } spacing={2}>
            <h4> Patrick, Lupe, Cristian, Mandee, Ultra</h4>
            {patients.map(patient => (
                <h4 key={patient?.id}>{patient?.f_name} {patient?.l_name} {patient?.address}
                 
                 </h4>
            ))}
        </Stack>
    );
};

export default TeamMember;
