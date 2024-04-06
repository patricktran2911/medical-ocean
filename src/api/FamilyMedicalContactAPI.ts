import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";
import { UUID } from "crypto";

export interface FamilyMedicalHistory {
    id: UUID;
    medical_conditions: string | null;
    allergies: string | null;
    patient: Patient
}

export async function getFamilyMedicalContact(patient_id: string): Promise<FamilyMedicalHistory[]> {
    const {data, error} = await supabase
    .from("family_medical_history")
    .select(`
        *,
        patient(*)
    `)
    .eq('patient_id', patient_id)

    if (error) throw new Error(error.message)

    return data ?? []
}