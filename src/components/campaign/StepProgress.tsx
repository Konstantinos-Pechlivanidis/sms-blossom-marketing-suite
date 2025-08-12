import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { campaignSteps } from "@/constants/campaign-steps";

interface Step {
  id: number;
  title: string;
  completed: boolean;
  icon?: React.ElementType;
}

interface StepProgressProps {
  steps: { id: number; title: string; completed: boolean; }[];
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
  const { t } = useTranslation();

  // Define local steps using translated titles
  const translatedSteps = steps.map(step => ({
    ...step,
    title: t(`createCampaign.steps.${step.title.toLowerCase().replace(/\s/g, '')}.title`)
  }));

  return (
    <Card className="rounded-3xl shadow-soft-lg border border-gray-200 dark:border-gray-800">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2">
          {translatedSteps.map((step, index) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = step.completed;
            const isClickable = canProceedToStep(step.id);

            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ease-in-out",
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-soft-md"
                      : isCompleted
                        ? "bg-success/10 text-success hover:bg-success/20 cursor-pointer"
                        : isClickable
                          ? "bg-muted text-muted-foreground hover:bg-gray-200 cursor-pointer"
                          : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <span className="font-medium text-base">{step.id}</span>
                  )}
                  <span className="hidden sm:inline-block truncate text-base">{step.title}</span>
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