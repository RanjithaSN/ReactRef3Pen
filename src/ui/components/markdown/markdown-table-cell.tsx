import React, { FC } from 'react';
import Table from '../table/table';

interface MarkdownTableCellProps {
  isHeader?: boolean;
  align?: 'left' | 'right'
}

const MarkdownTableCell: FC<MarkdownTableCellProps> = ({ children, isHeader, align }) => {
  if (isHeader) {
    return <Table.Header align={align}>{children}</Table.Header>;
  }
  return <Table.Cell align={align}>{children}</Table.Cell>;
};

export default MarkdownTableCell;
