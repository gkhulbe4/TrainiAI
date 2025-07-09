"use client";

import ProgressDialog from "@/app/_components/ProgressDialog";
import UserCard from "@/app/_components/UserCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { Call } from "@vapi-ai/web/dist/api";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function page() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [callId, setCallId] = useState("");

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // SOLUTION to get rid of "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  // auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function createPlan() {
    console.log("Creating plan...");
    try {
      if (!callId) return;
      setCreatingPlan(true);
      console.log("Call ID", callId);

      const res = await fetch("/api/createPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ callId }),
      });

      if (!res.ok) {
        console.error("Failed to create plan");
        toast.error("Failed to create plan");
        return;
      }

      const data = await res.json();
      console.log(data);
      toast.success("Plan created successfully");
      router.push("/profile");
    } catch (err) {
      console.error("Error creating plan:", err);
    } finally {
      setCreatingPlan(false);
    }
  }

  // navigate user to profile page after the call ends
  useEffect(() => {
    if (callEnded) {
      createPlan();
    }
  }, [callEnded, router]);

  // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: Error) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const name = user?.firstName ? `${user.firstName}` : "There";

        const res = await vapi.start(
          process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!,
          {
            variableValues: {
              name: name,
              user_id: user?.id,
            },
            analysisPlan: {
              structuredDataPlan: {
                enabled: true,
              },
            },
            metadata: {
              user_id: user?.id,
            },
            endCallPhrases: [
              "start creating your personalized workout and diet plan",
              "Please wait a moment",
            ],
          }
        );

        if (res) {
          console.log(res);
          setCallId(res.id);
        } else {
          console.log("no call id");
        }
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-10 pt-16 bg-zinc-950">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold font-mono tracking-tight text-gray-300">
            Generate Your{" "}
            <span className="text-gray-300 uppercase">Fitness Program</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Have a voice conversation with our AI assistant to create your
            personalized plan
          </p>
          <div className="h-1 mt-4 w-24 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full shadow-md shadow-blue-900/30" />
        </div>

        <ProgressDialog creatingPlan={creatingPlan} />

        {/* VIDEO CALL AREA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* AI ASSISTANT CARD */}
          <Card className="bg-card/90 backdrop-blur-md border border-purple-700/40 shadow-lg overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* VOICE WAVE ANIMATION */}
              {isSpeaking && (
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="mx-1 h-16 w-1 bg-primary rounded-full animate-sound-wave"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* AI IMAGE */}
              <div className="relative size-32 mb-4">
                <div
                  className={`absolute inset-0 rounded-full blur-xl bg-primary/30 ${
                    isSpeaking ? "animate-pulse" : ""
                  }`}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary shadow-md shadow-blue-900/50">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5612AQEiADotL0DRgw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689665628812?e=2147483647&v=beta&t=8VJ1MBpT_TGtbGY6lUuVn4rcnyQG4DaYpsRhJHlEWXo"
                    alt="AI Assistant"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/10 z-10" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-blue-800">TrainiAI</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fitness & Diet Coach
              </p>

              {/* Speaking Indicator */}
              <div
                className={`mt-4 flex items-center gap-2 px-4 py-1.5 text-sm rounded-full font-mono bg-background border ${
                  isSpeaking
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
                />
                <span>
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                    ? "Listening..."
                    : callEnded
                    ? "Creating plan..."
                    : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* USER CARD */}
          <UserCard user={user} />
        </div>

        {/* MESSAGE CONTAINER */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/90 backdrop-blur-md border border-blue-700/40 rounded-xl p-4 mb-8 h-64 overflow-y-auto custom-scrollbar shadow-md shadow-purple-900/20"
          >
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">
                    {msg.role === "assistant" ? "TrainiAI" : "You"}:
                  </div>
                  <p className="text-foreground text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALL CONTROLS */}
        <div className="w-full flex justify-center">
          <Button
            className={`relative overflow-hidden text-lg font-bold py-6 px-8 rounded-2xl transition-all duration-300 shadow-lg ${
              callActive
                ? "bg-destructive hover:bg-destructive/90"
                : callEnded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            } text-white`}
            onClick={toggleCall}
            disabled={connecting || callEnded || creatingPlan}
          >
            {connecting && (
              <span className="absolute inset-0 animate-ping bg-primary/40 rounded-full opacity-40"></span>
            )}
            <span className="relative z-10">
              {callActive
                ? "End Call"
                : connecting
                ? "Connecting..."
                : callEnded
                ? creatingPlan
                  ? "Creating your plan... Please wait..."
                  : "Redirecting..."
                : "Start Call"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
