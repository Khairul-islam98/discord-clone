import { redirect } from "next/navigation";
import { db } from "../../lib/db";
import { initialProfile } from "../../lib/initial-profile";



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
    return (
        <div>
            create setup page
        </div>
    );
};

export default SetupPage;