import getPlanFromGemini from "@/lib/actions/getPlanFromGemini";
import insertUserData from "@/lib/actions/insertUserData";
import { vapi_server } from "@/lib/vapi";
import { currentUser } from "@clerk/nextjs/server";
export async function POST(req: Request) {
  try {
    console.log("Starting plan generation...");
    const user = await currentUser();
    const data = await req.json();

    const userId: any = user?.id;
    console.log("User ID: ", userId);

    const callId = data.callId;
    console.log("Call ID: ", callId);

    const callData = await vapi_server.calls.get(callId);
    console.log(callData.analysis);
    const userData: any = callData.analysis?.structuredData;
    console.log("User Data: ", userData);
    const parsed = await getPlanFromGemini(userData);
    await insertUserData(parsed, userData, userId);

    console.log("✅ Plan created and inserted successfully!");

    return new Response(JSON.stringify({ message: "Plan created" }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error creating plan:", error);

    return new Response(
      JSON.stringify({ error: "Failed to create plan", details: error })
    );
  }
}

// async function waitForAnalysis(
//   callId: string,
//   maxAttempts = 10,
//   interval = 2000
// ) {
//   for (let i = 0; i < maxAttempts; i++) {
//     const callData = await vapi_server.calls.get(callId);
//     if (callData?.analysis?.structuredData) {
//       return callData.analysis.structuredData;
//     }
//     console.log(`Waiting for analysis... attempt ${i + 1}`);
//     await new Promise((res) => setTimeout(res, interval));
//   }
//   throw new Error("Timeout: Vapi analysis not available after retries");
// }

// CORS Preflight handler
// export async function OPTIONS() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Replace * with your domain for security
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }

//   const userData = {
//     age: "20",
//     height: "5 foot 8 inches",
//     weight: "70",
//     user_id: "Garvit",
//     injuries: "No",
//     fitness_goal: "Staying active",
//     workout_days: "5",
//     fitness_level: "Intermediate",
//     equipment_available: "Gym",
//     dietetary_restrictions: "Vegetarian",
//   };

//     const prompt = getPrompt(userData);
//     const geminiResponse: any = await chatSession.sendMessage(prompt);

//     const raw =
//       geminiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!raw) {
//       throw new Error("Invalid response from Gemini AI");
//     }
//     const jsonOnly = raw
//       .replace(/^```json/, "")
//       .replace(/```$/, "")
//       .trim();

//     const parsed = JSON.parse(jsonOnly);
