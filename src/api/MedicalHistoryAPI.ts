import { supabase } from "./supabaseInterface";
import { Patient } from "./PatientAPI";

export interface MedicalHistory {
    id: string;
    medical_conditions: string | null;
    current_medications: string | null;
    patient_id: string;
}

export async function getMedicalHistory(
    patient_id: string
): Promise<MedicalHistory[]> {
    const { data, error } = await supabase
        .from("medical_history")
        .select(
            `
        *
    `
        )
        .eq("patient_id", patient_id);

    if (error) throw new Error(error.message);

    return data ?? [];
}
