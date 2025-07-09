import { vapi_server } from "@/lib/vapi";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  // console.log(user);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  return NextResponse.json({ user: user }, { status: 200 });
}

export async function POST(req: Request) {
  const user = await currentUser();
  const data = await req.json();
  const callId = data.callId;
  console.log("Call ID : ", callId);
  const callData = await vapi_server.calls.get(callId);
  const userData = callData.analysis?.structuredData;
  console.log(userData);
  // console.log(user);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  return NextResponse.json({ user: user }, { status: 200 });
}
