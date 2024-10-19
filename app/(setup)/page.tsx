import { redirect } from "next/navigation";

import { InitialModal } from "@/components/modals/initial-modal";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";




const SetupPage = async() => {
    const profile = await initialProfile() as { id: string; userId: string; name: string; imageUrl: string; email: string; createdAt: Date; updatedAt: Date; }
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id 
                }
            }
        }
    })
    if(server){
        return redirect(`/server/${server.id}`)
    }
    return <InitialModal />
};

export default SetupPage;