import { supabase } from "./supabaseInterface";

export interface PatientVisitor {
    id: string,
    type: VisitorType,
    time: Date,
    patient_id: string
}

export enum VisitorType {
    walk_in = "Walk in",
    appointment = "appointment",
    emergency = "emergency"
}

export async function getAllPatientVisitor(): Promise<PatientVisitor[]> {
    const {data, error} = await supabase
    .from('patient_visitors')
    .select()
    
    if (error) {
        console.error(error)
    }

    return data ?? []
}

export async function getTodayPatientVisitor(time: Date): Promise<PatientVisitor[]> {
    let startDate = new Date(time.getDate())
    startDate.setHours(0,0,0,0)
    let endDate = new Date(startDate.getDate() + 1)
    
    const {data, error} = await supabase
    .from('patient_visitors')
    .select()
    .gte('time', startDate)
    .lte('time', endDate)

    if (error) {
        console.error(error)
    }

    return data ?? []
}