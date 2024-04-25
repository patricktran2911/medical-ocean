import { format, parseISO } from "date-fns";
import { supabase } from "./supabaseInterface";

export interface Patient {
    id: string;
    f_name: string;
    m_name?: string;
    l_name: string;
    gender?: string;
    email?: string;
    dob?: Date;
    age?: string;
    blood_group?: string;
    marital_status?: string;
    rh_factor?: string;
    address?: string;
    phone_number: string;
    preferred_language?: string;
    occupation?: string;
    ethnicity?: string;
    special_allergies?: string;
    created_date: Date;
}

export async function getAllPatients(): Promise<Patient[]> {
    const { data, error } = await supabase.from("patient").select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
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
    m_name?: string;
    l_name: string;
    gender?: string;
    email?: string;
    dob?: string;
    blood_group?: string;
    marital_status?: string;
    rh_factor?: string;
    address?: string;
    phone_number: string;
    preferred_language?: string;
    occupation?: string;
    ethnicity?: string;
    special_allergies?: string;
};
export async function createPatient(newPatient: NewPatient): Promise<Patient> {
    const { data, error } = await supabase
        .from("patient")
        .insert([newPatient])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function updatePatient(
    patient_id: string,
    f_name: string,
    l_name: string,
    email: string,
    phone_number: string,
    address: string
) {
    const { data, error } = await supabase
        .from("patient")
        .update({
            f_name: f_name,
            l_name: l_name,
            email: email,
            phone_number: phone_number,
            address: address,
        })
        .eq("id", patient_id);
}
