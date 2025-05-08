/**
 * Showcase Page for Bootstrap Buttons.
 */

// External Modules ----------------------------------------------------------

import React from 'react';
import Container from 'react-bootstrap/Container';

// Internal Modules ----------------------------------------------------------

import { ButtonsShowcase } from '@/components/showcases/Buttons';

// Public Objects ------------------------------------------------------------

export default function ButtonsShowcasePage() {
  return (
    <Container className="p-3">

      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">
          Buttons Showcase
        </h1>
      </Container>

      <ButtonsShowcase />

    </Container>
  );
};
