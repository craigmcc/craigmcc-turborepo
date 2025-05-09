/**
 * Page containing the example LoginForm.
 */

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import { LoginForm } from "@/components/shadcnui/LoginForm";

// Public Objects ------------------------------------------------------------

export default function LoginFormPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
