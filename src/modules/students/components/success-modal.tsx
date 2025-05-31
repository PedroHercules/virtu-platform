"use client";

import * as React from "react";
import { CheckCircle2, Users, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { studentsRoutes } from "@/routes/students";

interface StudentsSuccessModalProps {
  open: boolean;
  title?: string;
  description: string;
  onClose: () => void;
}

export function StudentsSuccessModal({
  open,
  title = "Operação realizada com sucesso!",
  description,
  onClose,
}: StudentsSuccessModalProps) {
  const router = useRouter();

  const handleGoToStudentsList = () => {
    onClose();
    router.push(studentsRoutes.students);
  };

  const handleCreateNewStudent = () => {
    onClose();
    router.push(studentsRoutes.studentsCreate);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="mt-2">{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-3 sm:flex-col mt-6">
          <div className="flex gap-3 w-full">
            <Button
              onClick={handleGoToStudentsList}
              className="flex-1"
              variant="default"
            >
              <Users className="h-4 w-4 mr-2" />
              Ver lista de alunos
            </Button>

            <Button
              onClick={handleCreateNewStudent}
              className="flex-1"
              variant="outline"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Criar novo aluno
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
