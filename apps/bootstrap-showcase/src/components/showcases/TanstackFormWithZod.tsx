"use client";

/**
 * Basic Form example with react-bootstrap and zod.
 */

// External Modules ----------------------------------------------------------

/*
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
*/

// Internal Modules ----------------------------------------------------------

import { /*SignUpSchema,*/ type SignUpSchemaType } from "@/zod-schemas/SignUpSchema";

// Public Objects ------------------------------------------------------------

export function TanstackFormWithZod() {

  const defaultValues: SignUpSchemaType = {
    city: "",
    firstName: "",
    lastName: "",
    state: "",
    terms: false,
    username: "",
    zip: "",
  };
  console.log(defaultValues); // TODO - just to get rid of compile error for now

  return (
    <div>
      <h1>Form with Zod</h1>
      <p>This is a form example using react-bootstrap and zod.</p>
    </div>
  );

}
