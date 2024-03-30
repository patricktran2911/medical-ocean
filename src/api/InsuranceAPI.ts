import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";
import { UUID } from "crypto";

export interface Insurance {
    id: UUID;
    insurance_provider: string;
    policy_number: string;
    group_number: string;
    primary_care_physician: string | null;
    patient: Patient
}

export async function getInsurance(patient_id: string): Promise<Insurance[]> {
    const {data, error} = await supabase
    .from("insurance")
    .select(`
        *,
        patient(*)
    `)
    .eq('patient_id', patient_id)

    if (error) throw new Error(error.message)

    return data ?? []
}