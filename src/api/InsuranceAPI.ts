import { supabase } from "./supabaseInterface";

export interface Insurance {
    id: string;
    insurance_provider: string;
    policy_number: string;
    group_number: string;
    primary_care_physician: string | null;
    patient_id: string;
    group_name: string;
}

export interface CreateInsurance {
    group_name: string;
    insurance_provider: string;
    policy_number: string;
    group_number: string;
    primary_care_physician: string | null;
}

export async function getInsurance(
    patient_id: string
): Promise<Insurance | undefined> {
    const { data, error } = await supabase
        .from("insurance")
        .select(`*`)
        .eq("patient_id", patient_id)

    if (error) {
        return undefined;
    }

    return data.length > 1 ? data[0] : undefined;
}
export async function createInsurance(
    insurance: CreateInsurance,
    patient_id: string
): Promise<Insurance> {
    const { data, error } = await supabase
        .from("insurance")
        .insert({
            group_name: insurance.group_name,
            insurance_provider: insurance.insurance_provider,
            policy_number: insurance.policy_number,
            group_number: insurance.group_number,
            primary_care_physician: insurance.primary_care_physician,
            patient_id: patient_id,
        })
        .eq("patient_id", patient_id)
        .select(`*`)
        .single();

    if (error) throw new Error(error.message);

    return data;
}
