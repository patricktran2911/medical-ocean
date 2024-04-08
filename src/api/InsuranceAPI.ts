import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";
import { UUID } from "crypto";

export interface Insurance {
    id: string;
    insurance_provider: string;
    policy_number: string;
    group_number: string;
    primary_care_physician: string | null,
    patient_id: string,
    group_name: string,
}

export async function getInsurance(patient_id: string): Promise<Insurance[]> {
    const {data, error} = await supabase
    .from("insurance")
    .select(`
        *
    `)
    .eq('patient_id', patient_id)

    if (error) throw new Error(error.message)

    console.log(data)

    return data ?? []
}