import { supabase } from "./supabaseInterface";
import { formatDateToString } from "../Utility/dateUtility";
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
    preferred_language: string | null;
    occupation: string | null;
    ethnicity: string | null;
}

export async function getAllPatients(): Promise<Patient[]> {
    const {data, error} = await supabase
    .from("patient")
    .select(`
        *
    `);
    
    if (error) {
        throw new Error(error.message);
    }

    return data.map(patient => {
        var result = patient
        result.dob = formatDateToString(patient.dob)
        return result
    })
}

export async function getPatient(id: number): Promise<Patient> {
    const {data, error} = await supabase
    .from("patient")
    .select(`
        *
    `)
    .eq("id", id)
    .single();
    if (error) throw new Error(error.message);
    if (data && data.dob) {
        data.dob = formatDateToString(data.dob);
    }
    return data;
}

export async function createPatient(f_name: string, l_name: string, dob: string, address: string, phone_number: string, gender: string, m_name?: string): Promise<Patient> {
    const {data, error} = await supabase
    .from("patient")
    .insert([
        {f_name, m_name, l_name, dob, address, phone_number, gender}
    ])
    .select()
    .single();

    if (error) throw new Error(error.message);
    return data as Patient
}

// export async function updatePatient(patient_id: number)