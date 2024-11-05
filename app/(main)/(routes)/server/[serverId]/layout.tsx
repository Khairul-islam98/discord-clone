import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";

import { redirect } from "next/navigation";

const serverIdLayout = async (
  props: {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>;
  }
) => {
  const params = await props.params;

  const {
    children
  } = props;

  const profile = await currentProfle();
  if (!profile) {
    return RedirectToSignIn({ redirectUrl: "/sign-in" });
  }


  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full ">
      <div className=" hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
           <ServerSidebar serverId={params.serverId}  />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default serverIdLayout;
