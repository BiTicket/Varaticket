import { Metadata } from "next";
import Ranking from "../components/block/Ranking";
import Breadcrumb from "../components/breadcrumb";

const item = {
    title: "Ranking",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Page",
            path: "/ranking",
        },
        {
            name: "Ranking",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Ranking",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Ranking />
        </>
    );
}
