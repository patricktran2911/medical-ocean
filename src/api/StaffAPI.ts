import { supabase } from "./supabaseInterface";

export interface Staff {
    id: string,
    f_name: string,
    l_name: string,
    employee_id: string,
    phone_number: string,
    title: string | null,
    email: string
}

export async function getAllStaff(): Promise<Staff[]> {
    const {data, error} = await supabase
    .from('staff')
    .select('*')

    if (error) {
        console.error(error)
    }

    return data ?? []
}

export async function getStaffWithId(id: string): Promise<Staff> {
    const {data, error} = await supabase
    .from('staff')
    .select('*')
    .single()

    if (error) {
        console.log(id)
        console.log(error)
    }

    return data
}