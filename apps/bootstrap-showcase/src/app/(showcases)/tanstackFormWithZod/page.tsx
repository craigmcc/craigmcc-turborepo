/**
 * Showcase Page for Tanstack Form with Zod validation.
 */

// External Modules ----------------------------------------------------------

import React from "react";
import Container from "react-bootstrap/Container";

// Internal Modules ----------------------------------------------------------

import { TanstackFormWithZod } from "@/components/showcases/TanstackFormWithZod";

// Public Objects ------------------------------------------------------------

export default function TanstackFormWithZodPage() {
  return (
    <Container className="p-3">

      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Tanstack Form with Zod Validation</h1>
      </Container>

      <TanstackFormWithZod />

    </Container>
  );
}
