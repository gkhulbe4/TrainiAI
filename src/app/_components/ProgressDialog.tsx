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
    <div>
      <AlertDialog open={creatingPlan} onOpenChange={() => {}}>
        <AlertDialogContent className="flex flex-col items-center justify-center gap-4 py-10 px-6 text-center rounded-2xl shadow-xl max-w-sm mx-auto">
          <RingLoader size={60} color="black" loading={creatingPlan} />
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Creating your personalized plan
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600 mt-2">
              Hang tight while we analyze your data and set up the perfect plan
              for you. This won’t take long.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProgressDialog;
