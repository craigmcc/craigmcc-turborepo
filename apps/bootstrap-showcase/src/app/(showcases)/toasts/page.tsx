/**
 * Showcase Page for Bootstrap Toasts.
 */

// External Modules ----------------------------------------------------------

import React from 'react';
import Container from 'react-bootstrap/Container';

// Internal Modules ----------------------------------------------------------

import { ToastsShowcase } from '@/components/showcases/Toasts';

// Public Objects ------------------------------------------------------------

export default function ToastsShowcasePage() {
  return (
    <Container className="p-3">

      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">
          Toasts Showcase
        </h1>
      </Container>

      <ToastsShowcase />

    </Container>
  );
};
