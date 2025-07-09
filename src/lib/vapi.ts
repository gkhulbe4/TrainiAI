import Vapi from "@vapi-ai/web";
import { VapiClient } from "@vapi-ai/server-sdk";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

export const vapi_server = new VapiClient({
  token: process.env.NEXT_PUBLIC_VAPI_PRIVATE_KEY!,
});

// vapi_server.assistants.update(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
//   server: {
//     url: "https://caring-lobster-wealthy.ngrok-free.app/webhooks/vapi",
//   },
// });
