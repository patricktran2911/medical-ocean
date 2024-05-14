import { Appointment } from "../AppointmentAPI";
import { supabase } from "../supabaseInterface";

export enum DatabaseRTTable {
	appointments = "appointments",
	patientVisitor = "patient_visitors",
	staffWorkingStatus = "staff_working_status",
	staff = "staff",
	patient = "patient",
}

export function subscribeRTTable(
	tablename: DatabaseRTTable,
	onDelete?: (row_id: string) => void,
	onInsert?: (object: any) => void,
	onUpdate?: (object: any) => void
) {
	supabase
		.channel("schema-db-changes")
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: `${tablename}`,
			},
			(payload) => {
				payload.eventType === "DELETE" && onDelete?.(payload.old["id"]);
				payload.eventType === "INSERT" && onInsert?.(payload.new);
				payload.eventType === "UPDATE" && onUpdate?.(payload.new);
			}
		)
		.subscribe();
}
