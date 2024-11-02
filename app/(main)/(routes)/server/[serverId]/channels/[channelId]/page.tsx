import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}


const ChannelIdPage = async({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfle();
    if(!profile) {
        return RedirectToSignIn({redirectUrl: "/sign-in"});
    }
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    })
    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.userId
        }
    })
    if(!channel || !member) {
    //    redirect("/");
    }
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
            name={channel!.name}
            serverId={channel!.serverId}
            type="channel"

            />
        </div>
    );
};

export default ChannelIdPage;