import { supabase } from "./supabaseInterface";

export interface FamilyMedicalHistory {
    id: string;
    medical_conditions: string | null;
    allergies: string | null;
    patient_id: string
}

export async function getFamilyMedicalContact(patient_id: string): Promise<FamilyMedicalHistory[]> {
    const {data, error} = await supabase
    .from("family_medical_history")
    .select(`
        *
    `)
    .eq('patient_id', patient_id)

    if (error) throw new Error(error.message)

    return data ?? []
}