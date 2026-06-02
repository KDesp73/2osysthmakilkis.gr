import React, { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showStrength?: boolean;
};

function strengthScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  return score;
}

export default function PasswordField({
  id,
  name,
  value,
  placeholder = "Enter password",
  className = "",
  onChange,
  showStrength = false,
}: PasswordFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const isControlled = onChange !== undefined;
  const strengthSource = isControlled ? (value ?? "") : internalValue;
  const score = strengthScore(strengthSource);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={className}>
      <div className="relative">
        <Input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="pr-12"
          aria-describedby={showStrength ? `${inputId}-strength` : undefined}
          {...(isControlled
            ? { value: value ?? "", onChange: handleChange }
            : {
                ...(value !== undefined ? { defaultValue: value } : {}),
                ...(showStrength ? { onChange: handleChange } : {}),
              })}
        />

        <Button
          type="button"
          variant="ghost"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showStrength && (
        <div id={`${inputId}-strength`} className="mt-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
              <div
                className={
                  "h-2 rounded transition-all duration-150" +
                  (score === 0
                    ? " w-0"
                    : score === 1
                      ? " w-1/4"
                      : score === 2
                        ? " w-1/2"
                        : score === 3
                          ? " w-3/4"
                          : " w-full")
                }
                style={{
                  backgroundColor:
                    score <= 1
                      ? "#f43f5e"
                      : score === 2
                        ? "#f59e0b"
                        : "#10b981",
                }}
              />
            </div>
            <div className="w-24 text-right">
              {score <= 1
                ? "Weak"
                : score === 2
                  ? "Fair"
                  : score === 3
                    ? "Good"
                    : "Strong"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
