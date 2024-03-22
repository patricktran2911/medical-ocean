import { supabase } from "./supabaseInterface";
import { QueryData } from "@supabase/supabase-js";

export interface Patient {
    id: number;
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
    emergency_contact: EmergencyContact | any | null;
    medical_histor?: MedicalHistory[] | null;
    insurance: Insurance | any | null;
    family_medical_history: FamilyMedicalHistory[] | null;
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
        marital_status,
        blood_group,
        rh_factor,
        address,
        phone_number,
        emergency_contact: emergency_contact_id ( id, f_name, l_name, relationship, phone_number ),
        gender,
        email,
        preferred_language,
        occupation,
        ethnicity,
        family_medical_history: family_medical_history_id ( id, medical_conditions, allergies ),
        insurance: insurance_id (id, insurance_provider, policy_number, group_number, primary_care_physician),
        medical_history: medical_history_id ( id, medical_conditions, allergies, current_medications)
    `);
    
    if (error) {
        throw new Error(error.message);
    }

    return data
}

export async function getPatient(id: number): Promise<Patient> {
    const {data, error} = await supabase
    .from("patient")
    .select(`
        id,
        f_name,
        m_name,
        l_name,
        dob,
        marital_status,
        blood_group,
        rh_factor,
        address,
        phone_number,
        emergency_contact: emergency_contact_id ( id, f_name, l_name, relationship, phone_number ),
        gender,
        email,
        preferred_language,
        occupation,
        ethnicity,
        family_medical_history: family_medical_history_id ( id, medical_conditions, allergies ),
        insurance: insurance_id (id, insurance_provider, policy_number, group_number, primary_care_physician),
        medical_history: medical_history_id ( id, medical_conditions, allergies, current_medications)
    `)
    .eq("id", id)
    .single();
    if (error) throw new Error(error.message);
    return data;
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