/**
 * Showcase Page for Bootstrap InputGroups.
 */

// External Modules ----------------------------------------------------------

import React from "react";
import Container from "react-bootstrap/Container";

// Internal Modules ----------------------------------------------------------

import { InputGroupsShowcase } from "@/components/showcases/InputGroups";

// Public Objects ------------------------------------------------------------

export default function ToastsShowcasePage() {
  return (
    <Container className="p-3">

      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">
          InputGroups Showcase
        </h1>
      </Container>

      <InputGroupsShowcase />

    </Container>
  );
};
