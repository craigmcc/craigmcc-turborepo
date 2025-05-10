"use client";

/**
 * Showcase for Bootstrap InputGroups.
 */

// External Modules ----------------------------------------------------------

import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
//import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// Internal Modules ----------------------------------------------------------

import { InputGroup } from "@/components/bootstrap/InputGroup";

// Public Objects ------------------------------------------------------------

export function InputGroupsShowcase() {

  const [password, setPassword] = useState<string>("Initial password");
  const [username, setUsername] = useState<string>("Initial username");

  return (
    <Container fluid>
      <Row className="mb-3 gx-5">
        <Col>
          {/*<Form>*/}
            <InputGroup
              autoFocus
              label="Username 1"
              name="inputGroup1"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Horizontal input group"
              type="text"
              value={username}
              vertical
            />
            <InputGroup
              label="Password 1"
              name="inputGroup2"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Horizontal input group"
              type="password"
              value={password}
              vertical
            />
          {/*</Form>*/}
        </Col>
        <Col>
          {/*<Form>*/}
            <InputGroup
              label="Username 2"
              name="inputGroup3"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Vertical input group"
              type="text"
              value={username}
            />
            <InputGroup
              label="Password 2"
              name="inputGroup4"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vertical input group"
              type="password"
              value={password}
            />
          {/*</Form>*/}
        </Col>
      </Row>
    </Container>
  );
}
