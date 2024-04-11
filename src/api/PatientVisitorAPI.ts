import { format } from "date-fns";
import { supabase } from "./supabaseInterface";

export interface PatientVisitor {
    id: string;
    type: VisitorType;
    time: Date;
    patient_id: string;
}

export enum VisitorType {
    walk_in = "walk in",
    appointment = "appointment",
    emergency = "emergency",
}

export async function getAllPatientVisitor(): Promise<PatientVisitor[]> {
    const { data, error } = await supabase.from("patient_visitors").select();

    if (error) {
        console.error(error);
    }

    return data ?? [];
}

export async function getPatientVisitors(
    time: Date
): Promise<PatientVisitor[]> {
    let startDate = new Date(time);
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    let startDateString = format(startDate, "yyyy-MM-dd HH:mm:ss");
    let endDateString = format(endDate, "yyyy-MM-dd HH:mm:ss");

    const { data, error } = await supabase
        .from("patient_visitors")
        .select()
        .gte("time", startDateString)
        .lte("time", endDateString)
        .order("time", { ascending: true });

    if (error) {
        console.error(error);
    }

    return data ?? [];
}

export async function createPatientVisitor(
    patient_id: string,
    type: VisitorType
) {
    await supabase.from("patient_visitors").insert({
        patient_id: patient_id,
        time: new Date(),
        type: type,
    });
}
