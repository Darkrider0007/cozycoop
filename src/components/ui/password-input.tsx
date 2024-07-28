import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Eye, EyeOffIcon } from "lucide-react"

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, type, ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
        return (
            <Input ref={ref} type={isPasswordVisible ? "text" : "password"} className={className} {...props}
                suffix={
                    isPasswordVisible ?
                        <EyeOffIcon
                            className="cursor-pointer select-none"
                            onClick={() => setIsPasswordVisible(false)}
                        />
                        :
                        <Eye
                            className="cursor-pointer select-none"
                            onClick={() => setIsPasswordVisible(true)}
                        />
                }
            />
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
