import BlogItem from "@/app/components/block/BlogItem";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Blog",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Community",
            path: "/blog",
        },
        {
            name: "Blog",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Blog",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <BlogItem />
        </>
    );
}
