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
    emergency_contact_id: number;
    taken_medicines_id?: number[];
    primary_doctor_id?: number;
}

export async function getAllPatients(): Promise<Patient[]> {
    const {data, error} = await supabase
    .from("patient")
    .select("*");

    console.log("data", data);
    
    if (error) {
        throw new Error(error.message);
    }

    return data as Patient[]
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