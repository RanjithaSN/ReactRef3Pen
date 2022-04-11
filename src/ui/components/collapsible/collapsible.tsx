import React, { useState, useEffect, ReactNode } from 'react';
import Stack from '../stack/stack';
import CollapsibleButton from './collapsible-button';
import CollapsibleContent from './collapsible-content';

interface CollapsibleProps {
  label: ReactNode;
  onClick: () => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({ label, children, ...rest }) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true);
  }, [children]);

  return (
    <Stack>
      <CollapsibleButton value={!collapsed} onClick={setCollapsed} {...rest}>{label}</CollapsibleButton>
      {!collapsed && <CollapsibleContent>{children}</CollapsibleContent>}
    </Stack>
  );
};

export default Collapsible;
