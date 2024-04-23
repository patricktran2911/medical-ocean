import { useEffect, useLayoutEffect, useState } from "react";
import { supabase } from "../../api/supabaseInterface";
import { format, parseISO } from "date-fns";
import { Box, Paper, Stack, SxProps, Theme, Typography } from "@mui/material";
import { BarChart, axisClasses } from "@mui/x-charts";

type MonthlyPatientCount = {
    month: string;
    count: number;
};

async function getMonthlyNumberOfPatients(
    year: string
): Promise<MonthlyPatientCount[]> {
    const { data, error } = await supabase
        .from("monthly_new_patients")
        .select(`*`);

    if (error) {
        console.log(error.message);
    }

    if (data) {
        let filteredData = data.filter((monthly) => {
            const date = parseISO(monthly.date);
            let yearString = format(date, "yyyy");
            return yearString === year;
        });
        let result: MonthlyPatientCount[] = filteredData.map(
            (monthlyPatient) => {
                var date = parseISO(monthlyPatient.date);
                date.setDate(1);
                let monthString = format(date, "MMM");
                return {
                    month: monthString,
                    count: monthlyPatient.new_patients ?? 0,
                };
            }
        );
        return result ?? [];
    }
    return [];
}

const useContainerStyle: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
    maxHeight: "700px",
    maxWidth: "1500px",
    background: "white",
    borderRadius: "32px",
    whiteSpace: "nowrap",
    WebkitBoxShadow: "-1px 5px 10px 1px #000000",
};

const useTitleContainerStyle: SxProps<Theme> = {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    borderTopLeftRadius: "32px",
    borderTopRightRadius: "32px",
    background: "linear-gradient(45deg, #2c3e50 0%, #4ca1af 100%)",
};
export default function MonthlyNewPatientsChart() {
    const [annualPatients, setAnnualPatients] = useState<MonthlyPatientCount[]>(
        []
    );

    useLayoutEffect(() => {
        fetchRequireData();
    }, []);

    async function fetchRequireData() {
        let result = await getMonthlyNumberOfPatients("2024");
        console.log(result);
        setAnnualPatients(result);
    }

    return (
        <Stack direction={"column"} spacing={2} sx={useContainerStyle}>
            <Box sx={useTitleContainerStyle}>
                <Typography variant="h4" fontWeight={"bold"} color={"white"}>
                    Annual New Patients
                </Typography>
            </Box>
            {annualPatients.length > 0 && (
                <BarChart
                    xAxis={[
                        {
                            data: annualPatients.map(
                                (monthly) => monthly.month
                            ),
                            scaleType: "band",
                            label: "MONTH",
                            labelStyle: {
                                fontSize: "20px",
                                fontWeight: "bold",
                            },
                            tickLabelStyle: {
                                fontSize: "15px",
                                fontWeight: "bold",
                            },
                        },
                    ]}
                    series={[
                        {
                            data: annualPatients.map((x) => x.count),
                        },
                    ]}
                    yAxis={[
                        {
                            label: "NEW PATIENTS",
                            labelStyle: {
                                fontSize: "20px",
                                fontWeight: "bold",
                            },
                            tickLabelStyle: {
                                fontSize: "15px",
                                fontWeight: "bold",
                            },
                        },
                    ]}
                    colors={["#438695"]}
                    margin={{ top: 50, bottom: 100, left: 70, right: 70 }}
                    sx={{
                        [`& .${axisClasses.left} .${axisClasses.label}`]: {
                            transform: ["translateX(-10px)"],
                        },
                        [`& .${axisClasses.bottom} .${axisClasses.label}`]: {
                            transform: ["translateY(10px)"],
                        },
                    }}
                />
            )}
        </Stack>
    );
}
