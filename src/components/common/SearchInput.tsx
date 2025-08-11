// File: src/components/common/SearchInput.tsx

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeEvent, forwardRef, ComponentPropsWithoutRef } from "react";

// Correctly define the props by omitting the native onChange and then adding your custom one.
// This resolves the type conflict.
export interface SearchInputProps extends Omit<ComponentPropsWithoutRef<"input">, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, className, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={cn("relative", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          value={value}
          onChange={handleChange}
          className="pl-9"
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
