import { supabase } from "./supabaseInterface";

export default interface LabReportObject {
    id: string;
    name_of_lab: string;
    date_received: Date;
    file_url: URL;
    patient_id: string;
}

export async function getAllLabReports(
    patient_id: string
): Promise<LabReportObject[]> {
    const { data, error } = await supabase
        .from("lab_reports")
        .select("*")
        .eq("patient_id", patient_id);

    if (error) {
        throw error;
    }
    return data;
}

export async function updateLabReport(patient_id: string, file_url: URL) {
    const { data, error } = await supabase
        .from("lab_reports")
        .update({
            file_url: file_url,
        })
        .eq("patient_id", patient_id);
}
