import { currentProfle } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, props: { params: Promise<{ serverId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfle();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server Id missing", { status: 400 });
    }
    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ serverId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfle();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
