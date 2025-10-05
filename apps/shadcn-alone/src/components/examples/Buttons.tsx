/**
 * Buttons example component.
 */

// External Modules ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button";
import {
  Card,
//  CardAction,
  CardContent,
//  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import {
  Table,
  TableBody,
//  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/components/table";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Buttons() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <Card className="w-70">
        <CardHeader>
          <CardTitle className="items-center justify-center">Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variant</TableHead>
                <TableHead>Button</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VARIANTS.map((variant) => (
                <TableRow key={variant}>
                  <TableCell className="font-medium">{variant}</TableCell>
                  <TableCell className="text-center">
                    <Button variant={variant}>{variant}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-70">
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Button</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SIZES.map((size) => (
                <TableRow key={size}>
                  <TableCell className="text-center">{size}</TableCell>
                  <TableCell className="text-center">
                    <Button size={size}>{size}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}

// Private Objects -----------------------------------------------------------

type SIZE = "default" | "icon" | "lg" | "sm" | null | undefined;

const SIZES: SIZE[] = [
  "default",
  "icon",
  "lg",
  "sm",
];

type VARIANT = "default" | "destructive" | "ghost" | "link" | "outline" | "secondary" | null | undefined;

const VARIANTS: VARIANT[] = [
  "default",
  "destructive",
  "ghost",
  "link",
  "outline",
  "secondary",
];
