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
                <div key={patient?.id}>
                    <h4>{patient?.f_name} {patient?.l_name} {patient?.address}</h4>
                    <ul>
                        { Array.isArray(patient.emergency_contact) && patient.emergency_contact?.map(contact => (
                        <li key= {contact.id}>{contact.f_name} {contact.l_name}</li>
                    ))}
                    </ul>
                </div>
            ))}
        </Stack>
    );
};

export default TeamMember;
