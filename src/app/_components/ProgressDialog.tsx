import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RingLoader } from "react-spinners";

function ProgressDialog({ creatingPlan }: { creatingPlan: boolean }) {
  return (
    <AlertDialog open={creatingPlan} onOpenChange={() => {}}>
      <AlertDialogContent className="bg-zinc-900/70 border border-blue-700/50 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full mx-auto flex flex-col items-center justify-center gap-6 py-10 px-8 text-center">
        <RingLoader size={60} color="#60A5FA" loading={creatingPlan} />

        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-blue-300 tracking-wide">
            Creating your personalized plan
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-gray-400 mt-2 leading-relaxed">
            Please wait while our AI analyzes your data to build the perfect
            plan for your body and goals. Do not close this window.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ProgressDialog;
