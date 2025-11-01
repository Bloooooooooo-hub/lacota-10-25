import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
// --- OTP Components --- //
export const InputOTPGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center gap-2">{children}</div>
)

export const InputOTPSlot = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    maxLength={1}
    className={cn(
      "w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none text-lg",
      className
    )}
    {...props}
  />
))
InputOTPSlot.displayName = "InputOTPSlot"

export const InputOTP = ({
  length = 6,
  onChange,
}: {
  length?: number
  onChange?: (value: string) => void
}) => {
  const [values, setValues] = React.useState(Array(length).fill(""))

  const handleChange = (index: number, val: string) => {
    const newValues = [...values]
    newValues[index] = val.slice(-1)
    setValues(newValues)
    onChange?.(newValues.join(""))
  }

  return (
    <InputOTPGroup>
      {values.map((val, i) => (
        <InputOTPSlot
          key={i}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
    </InputOTPGroup>
  )
}
