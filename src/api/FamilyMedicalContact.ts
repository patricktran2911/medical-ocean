import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";

export interface FamilyMedicalHistory {
    id: number;
    medical_conditions: string | null;
    allergies: string | null;
    patient: Patient
}

export async function getFamilyMedicalContact(patient_id: number): Promise<FamilyMedicalHistory[]> {
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