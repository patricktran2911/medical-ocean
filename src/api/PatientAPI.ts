import { supabase } from "./supabaseInterface";

export interface Patient {
    id: number;
    f_name: string;
    m_name?: string;
    l_name: string;
    gender: string;
    email?: string;
    dob: string;
    address: string;
    phone_number: string;
    emergency_contact?: EmergencyContact[];
    medical_history?: MedicalHistory[];
    insurance?: Insurance[];
    family_medical_history?: FamilyMedicalHistory[];
    preferred_language: string;
    occupation: string;
    ethnicity: string;
}

export interface EmergencyContact {
    id: number;
    f_name: string;
    l_name: string;
    relationship: string;
    phone_number: string;
}

export interface FamilyMedicalHistory {
    id: number;
    medical_conditions?: string;
    allergies?: string;
}

export interface Insurance {
    id: number;
    insurance_provider: string;
    policy_number: string;
    group_number: string;
    primary_care_physician?: string;
}

export interface MedicalHistory {
    id: number;
    medical_conditions?: string;
    allergies?: string;
    current_medications?: string;
}

export async function getAllPatients(): Promise<Patient[]> {
    const {data, error} = await supabase
    .from("patient")
    .select(`
        id,
        f_name,
        m_name,
        l_name,
        dob,
        address,
        phone_number,
        emergency_contact ( id, f_name, l_name, relationship, phone_number ),
        gender,
        email,
        preferred_language,
        occupation,
        ethnicity,
        family_medical_history: family_medical_history_id ( id, medical_conditions, allergies ),
        insurance: insurance_id (id, insurance_provider, policy_number, group_number, primary_care_physician),
        medical_history: medical_history_id ( id, medical_conditions, allergies, current_medications)
    `);

    console.log("data", data);
    
    if (error) {
        throw new Error(error.message);
    }

    const dataConvert: Patient[] = data.map (patient => ({
        id: patient.id,
        f_name: patient.f_name,
        m_name: patient.m_name,
        l_name: patient.l_name,
        gender: patient.gender,
        email: patient.email,
        dob: patient.dob,
        address: patient.address,
        phone_number: patient.phone_number,
        emergency_contact: patient.emergency_contact,
        medical_history: patient.medical_history,
        insurance: patient.insurance,
        family_medical_history: patient.family_medical_history,
        preferred_language: patient.preferred_language,
        occupation: patient.occupation,
        ethnicity: patient.ethnicity,
    }))

    return dataConvert
}

export async function getPatient(id: number): Promise<Patient> {
    const {data, error} = await supabase
    .from("patient")
    .select()
    .eq("id", id)
    .single();
    console.log("data", data);
    if (error) throw new Error(error.message);
    return data as Patient;
}

export async function createPatient(f_name: string, l_name: string, dob: string, address: string, phone_number: string, m_name?: string): Promise<Patient> {
    const {data, error} = await supabase
    .from("patient")
    .insert([
        {f_name, m_name, l_name, dob, address, phone_number}
    ])
    .select()
    .single();

    if (error) throw new Error(error.message);
    return data as Patient
}