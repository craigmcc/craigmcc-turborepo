import React from 'react';

import Button from 'react-bootstrap/Button';

const ButtonsShowcase: React.FC = () => (
  <div className="p-1">
    <Button variant="primary" className="me-2">
      Primary
    </Button>
    <Button variant="secondary" className="me-1">
      Secondary
    </Button>
    <Button variant="success" className="me-1">
      Success
    </Button>
    <Button variant="warning" className="me-1">
      Warning
    </Button>
    <Button variant="danger" className="me-1">
      Danger
    </Button>
    <Button variant="info" className="me-1">
      Info
    </Button>
    <Button variant="light" className="me-1">
      Light
    </Button>
    <Button variant="dark" className="me-1">
      Dark
    </Button>
    <Button variant="link" className="me-1">
      Link
    </Button>
  </div>
);

export default ButtonsShowcase;
