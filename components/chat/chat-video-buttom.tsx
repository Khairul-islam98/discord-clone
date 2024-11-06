"use client";

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Video, VideoOff } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";



export const ChatVideoButtom = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isVideo =  searchParams?.get("video") 
    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End video call" : "Start video call";

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: isVideo ? undefined : { video: "true" },
        }, { skipNull: true })
        router.push(url)
    }


    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button
            onClick={onClick}
            className="hover:opacity-75 transition mr-4"
            >
                <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionTooltip>
    );
};

