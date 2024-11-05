import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: Promise<{
        inviteCode: string;
    }>
}

const InviteCodePage = async (props: InviteCodePageProps) => {
    const params = await props.params;
    const profile = await currentProfle();
    if(!profile) {
        return RedirectToSignIn({redirectUrl: "/sign-in"});
    }
    if(!params.inviteCode) {
        return redirect("/")
    }
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if(existingServer) {
        return redirect(`/server/${existingServer.id}`);
    }
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    })
    if(server){
        return redirect(`/server/${server.id}`);
    }
    return null;
};

export default InviteCodePage;