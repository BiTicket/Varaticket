import BlogSingle from "@/app/components/block/BlogSingle";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Blog Details",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Community",
            path: "/blog/1",
        },
        {
            name: "Blog Details",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Blog Single",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <BlogSingle />
        </>
    );
}
