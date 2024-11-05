import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: Promise<{
        serverId: string;
        channelId: string;
    }>
}


const ChannelIdPage = async (props: ChannelIdPageProps) => {
    const params = await props.params;
    const profile = await currentProfle();
    if(!profile) {
        return RedirectToSignIn({redirectUrl: "/sign-in"});
    }
    const channel = await db.channel.findUnique({
        where: {
            id: params?.channelId
        }
    })
    const member = await db.member.findFirst({
        where: {
            serverId: params?.serverId,
            profileId: profile.id
        }
    })
    if(!channel || !member) {
       redirect("/");
    }
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
            name={channel.name}
            serverId={channel.serverId}
            type="channel"

            />
            <ChatMessages 
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId
            }}
            paramKey="channelId"
            paramValue={channel.id}
            />
            <ChatInput 
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
                channelId: channel.id,
                serverId: channel.serverId
            }}
            />
        </div>
    );
};

export default ChannelIdPage;