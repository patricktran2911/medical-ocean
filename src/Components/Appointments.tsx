import React from "react";

function HomeTitle({ title }: { title: string }) {
    return <h1>{title}</h1>;
}

export default function Appointments() {
    return (
        <>
            <h1>Medical Ocean</h1>

            <HomeTitle title="Team THOR" />
        </>
    );
}