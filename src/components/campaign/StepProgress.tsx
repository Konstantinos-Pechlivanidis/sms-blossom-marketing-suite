import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  completed: boolean;
  icon?: React.ElementType; // Allow icons to be passed as props
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
  canProceedToStep: (stepId: number) => boolean;
}

export const StepProgress = ({ 
  steps, 
  currentStep, 
  onStepClick, 
  canProceedToStep 
}: StepProgressProps) => {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {steps.map((step, index) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = step.completed;
            const isClickable = canProceedToStep(step.id);
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all",
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : isCompleted
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                        : isClickable
                          ? "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                          : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  )}
                >
                  {Icon ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <span className="font-medium">{step.id}</span>
                  )}
                  <span className="hidden sm:inline truncate">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mx-1 sm:mx-2 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};