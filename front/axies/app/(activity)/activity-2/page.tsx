import Activity2 from "@/app/components/block/Activity2";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Activity 2",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Community",
            path: "/activity-1",
        },
        {
            name: "Activity 2",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Activity 2",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Activity2 />
        </>
    );
}
