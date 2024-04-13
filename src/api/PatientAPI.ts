import { parseISO } from "date-fns";
import { supabase } from "./supabaseInterface";

export interface Patient {
    id: string;
    f_name: string;
    m_name: string | null;
    l_name: string;
    gender: string;
    email: string | null;
    dob: string;
    age: string;
    blood_group: string | null;
    marital_status: string | null;
    rh_factor: string | null;
    address: string;
    phone_number: string;
    preferred_language: string | null;
    occupation: string | null;
    ethnicity: string | null;
    special_allergies: string | null;
    created_date: Date;
}

export async function getAllPatients(): Promise<Patient[]> {
    const { data, error } = await supabase.from("patient").select();

    if (error) {
        throw new Error(error.message);
    }

    return data.map((patient) => {
        var result = patient;
        const dateOfBirth = parseISO(patient.dob);

        result.dob = dateOfBirth.toLocaleDateString();
        return result;
    });
}

export async function getPatient(id: string): Promise<Patient> {
    const { data, error } = await supabase
        .from("patient")
        .select(
            `
        *
    `
        )
        .eq("id", id)
        .single();
    if (error) throw new Error(error.message);
    if (data && data.dob) {
        const dateOfBirth = parseISO(data.dob);

        data.dob = dateOfBirth.toLocaleDateString();
    }
    return data;
}

export type NewPatient = {
    f_name: string;
    m_name: string | null;
    l_name: string;
    gender: string;
    email: string | null;
    dob: string;
    blood_group: string | null;
    marital_status: string | null;
    rh_factor: string | null;
    address: string;
    phone_number: string;
    preferred_language: string | null;
    occupation: string | null;
    ethnicity: string | null;
    special_allergies: string | null;
};
export async function createPatient(newPatient: NewPatient): Promise<Patient> {
    const { data, error } = await supabase
        .from("patient")
        .insert([
            {
                f_name: newPatient.f_name,
                m_name: newPatient.m_name,
                l_name: newPatient.l_name,
                gender: newPatient.gender,
                email: newPatient.email,
                dob: newPatient.dob,
                blood_group: newPatient.blood_group,
                marital_status: newPatient.marital_status,
                rh_factor: newPatient.rh_factor,
                address: newPatient.address,
                phone_number: newPatient.phone_number,
                preferred_language: newPatient.preferred_language,
                occupation: newPatient.occupation,
                ethnicity: newPatient.ethnicity,
                special_allergies: newPatient.special_allergies,
            },
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}

// export async function updatePatient(patient_id: number)
