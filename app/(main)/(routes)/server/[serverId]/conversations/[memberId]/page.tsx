import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: Promise<{
    serverId: string;
    memberId: string;
  }>;
}

const MemberIdPage = async (props: MemberIdPageProps) => {
  const params = await props.params;
  const profile = await currentProfle();
  if (!profile) {
    return RedirectToSignIn({ redirectUrl: "/sign-in" });
  }
  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });
  if (!currentMember) {
    return redirect("/");
  }
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );
  if (!conversation) {
    return redirect(`/server/${params.serverId}`);
  }
  const { memberOne, memberTwo } = conversation;
  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      <ChatMessages
      member={currentMember}
      name={otherMember.profile.name}
      chatId={conversation.id}
      type="conversation"
      apiUrl="/api/direct-messages"
      paramKey="conversationId"
      paramValue={conversation.id}
      socketUrl="/api/socket/direct-messages"
      socketQuery={{
        conversationId: conversation.id,

      }}
       />
      <ChatInput
       name={otherMember.profile.name}
       type="conversation"
       apiUrl="/api/socket/direct-messages"
       query={{
        conversationId: conversation.id,
       }}
       />
    </div>
  );
};

export default MemberIdPage;
