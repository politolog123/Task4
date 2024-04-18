import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const ActionToolbar = ({ onDelete, onBlock, onUnblock }) => {
  return (
    <div className="mb-3">
      <ButtonGroup>
        <Button variant="danger" className="mr-2" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="secondary" className="mr-2" onClick={onBlock}>
          Block
        </Button>
        <Button variant="primary" onClick={onUnblock}>
          Unblock
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ActionToolbar;