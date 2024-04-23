import { supabase } from "./supabaseInterface";

export interface EmergencyContact {
    id: string;
    f_name: string;
    l_name: string;
    relationship: string;
    phone_number: string;
    patient_id: string;
}

export interface CreateEmergencyContact {
    f_name: string;
    l_name: string;
    relationship: string;
    phone_number: string;
}

export async function getEmergencyContact(
    patient_id: string
): Promise<EmergencyContact[]> {
    const { data, error } = await supabase
        .from("emergency_contact")
        .select(
            `
        *
    `
        )
        .eq("patient_id", patient_id);

    if (error) throw new Error(error.message);

    return data ?? [];
}

export async function createEmergencyContact(
    emergencyContact: CreateEmergencyContact,
    patient_id: string
): Promise<EmergencyContact> {
    const { data, error } = await supabase
        .from("emergency_contact")
        .insert({
            f_name: emergencyContact.f_name,
            l_name: emergencyContact.l_name,
            relationship: emergencyContact.relationship,
            phone_number: emergencyContact.phone_number,
            patient_id: patient_id,
        })
        .eq("patient_id", patient_id)
        .select(`*`)
        .single();

    if (error) throw new Error(error.message);

    return data;
}

export async function updateEmergencyContact(
    emergencyContactId: string,
    name: string,
    relationship: string,
    phone_number: string
) {
    const { data, error } = await supabase
        .from("emergency_contact")
        .update({
            f_name: name,
            relationship: relationship,
            phone_number: phone_number,
        })
        .eq("id", emergencyContactId);
}
