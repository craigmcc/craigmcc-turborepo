
// External Imports ----------------------------------------------------------

import React from 'react';
import Container from 'react-bootstrap/Container';

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export default function RootPage() {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">
          Welcome To React-Bootstrap Showcase
        </h1>
        <p className="lead">
          Click one of the drop-down links above to see components in action.
        </p>
      </Container>
    </Container>
  );
};
