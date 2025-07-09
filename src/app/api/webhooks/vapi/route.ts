// app/api/vapi-webhook/route.ts (or pages/api/vapi-webhook.ts)

import getPlanFromGemini from "@/lib/actions/getPlanFromGemini";
import insertUserData from "@/lib/actions/insertUserData";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const event = data.message;
    const eventType = event.type;
    console.log("Event type :", eventType);

    switch (eventType) {
      case "end-of-call-report":
        const analysis = event.analysis;
        const summary = analysis.summary;
        const structuredData = analysis?.structuredData;
        const callId = event.call.id;
        const metaData = event.assistant.metadata;
        const variableValues = event.assistant.variableValues;

        if (analysis) {
          console.log("Call Analysis (Structured Data):", analysis);
        } else {
          console.log("No structured data analysis found for this call.");
        }

        console.log("Summary:", summary);
        console.log("Structured Data:", structuredData);
        console.log("Call ID:", callId);
        console.log("Customer ID (from metadata):", metaData);
        console.log("Variable Values:", variableValues);
        const userPlanData = await getPlanFromGemini(structuredData);
        const insertedUser = await insertUserData(
          userPlanData,
          structuredData,
          variableValues.user_id
        );
        break;

      case "hang":
        console.log("Call has been hung up.");
        break;

      default:
        console.log(`Unhandled Vapi event type: ${event.type}`);
    }

    return new NextResponse("Webhook Received", { status: 200 });
  } catch (error) {
    console.error("Error processing Vapi webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
