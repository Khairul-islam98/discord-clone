import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        serverId: string;
    }
}

const ServerIdPage = async({
    params
}:ServerIdPageProps ) => {
    const profile = await currentProfle()
    if(!profile) {
        return RedirectToSignIn({ redirectUrl: "/sign-in" });
    }
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })
    const intialChannel = server?.channels[0];
    if(intialChannel?.name !== "general"){
        return null;
    }
    return redirect(`/server/${params.serverId}/channels/${intialChannel.id}`);
};

export default ServerIdPage;