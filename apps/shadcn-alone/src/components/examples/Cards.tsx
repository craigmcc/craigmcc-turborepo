/**
 * Cards example component.
 */

// External Modules ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card"
import { Input } from "@repo/shadcn-ui/components/input"
import { Label } from "@repo/shadcn-ui/components/label"
import clsx from "clsx";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Cards() {

  return (
    <div className="grid grid-cols-2 gap-3 justify-evenly">

      <table>
        <thead>
          <tr>
            <th><h1>Colors</h1></th>
            <th><h1>Cards</h1></th>
          </tr>
        </thead>
        <tbody>
        {Array.from(COLORS.keys()).map((color) => (
          <tr key={color}>
            <td>{color}</td>
            <td className="py-1">
              <CardDemo border="border-0" color={color} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <table>
        <thead>
        <tr>
          <th><h1>Borders</h1></th>
          <th><h1>Cards</h1></th>
        </tr>
        </thead>
        <tbody>
        {BORDERS.map((border) => (
          <tr key={border}>
            <td>{border}</td>
            <td className="py-1">
              <CardDemo border={border} color="accent" />
            </td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>
  );
}

// Private Objects -----------------------------------------------------------

const BORDERS: string[] = [
  "border-0",
  "border-2",
  "border-4",
  "border-8",
];

const COLORS: Map<string, string> = new Map([
  ["accent", "bg-accent text-accent-foreground"],
  ["card", "bg-card text-card-foreground"],
  ["muted", "bg-muted text-muted-foreground"],
  ["neutral", "bg-neutral text-neutral-foreground"],
  ["primary", "bg-primary text-primary-foreground"],
  ["secondary", "bg-secondary text-secondary-foreground"],
]);

interface CardDemoProps {
  border: string;
  color: string;
}

function CardDemo({ border, color }: CardDemoProps) {

  const cardClasses = clsx(
    border || null,
    color ? COLORS.get(color) : null,
  );

  return (
    <Card className={`w-96 ${cardClasses}`}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
