/**
 * Showcase Page for Bootstrap Buttons.
 */

// External Modules ----------------------------------------------------------

import React from 'react';
import Button from 'react-bootstrap/Button';

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function ButtonsShowcase(){
  return (
    <div className="p-1">
      <Button variant="" className="me-2">
        Primary
      </Button>
      <Button variant="secondary" className="me-2">
        Secondary
      </Button>
      <Button variant="success" className="me-2">
        Success
      </Button>
      <Button variant="warning" className="me-2">
        Warning
      </Button>
      <Button variant="danger" className="me-2">
        Danger
      </Button>
      <Button variant="info" className="me-2">
        Info
      </Button>
      <Button variant="light" className="me-2">
        Light
      </Button>
      <Button variant="dark" className="me-2">
        Dark
      </Button>
      <Button variant="link" className="me-2">
        Link
      </Button>
    </div>
  );
}
