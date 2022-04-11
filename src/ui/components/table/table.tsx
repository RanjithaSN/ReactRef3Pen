import React, { FC } from 'react';
import styled from 'styled-components';
import { color, spacing } from 'ui/theme/theme.helpers';
import Stack from '../stack/stack';
import Body from './table-body';
import Cell from './table-cell';
import Foot from './table-foot';
import Head from './table-head';
import Header from './table-header';
import Heading from './table-heading';
import Row from './table-row';

interface TableWrapperProps {
  block?: boolean;
  tableSpace?: string;
}

interface TableStatics {
  Cell: typeof Cell;
  Heading: typeof Heading;
  Header: typeof Header;
  Row: typeof Row;
  Body: typeof Body;
  Foot: typeof Foot;
  Head: typeof Head;
  Wrapper: typeof TableWrapper;
}

export const StyledTable = styled.table`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const TableWrapper = styled(Stack) <TableWrapperProps>`
  padding: 0;
  margin: 0;
  padding: ${({ tableSpace }) => spacing(tableSpace)};
  border: solid 1px ${color('accentTertiary')};
  width: ${({ block }) => (block ? '100%' : 'auto')};
`;

const Table: FC & TableStatics = (props) => <StyledTable {...props} />;

Table.Cell = Cell;
Table.Heading = Heading;
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Foot = Foot;
Table.Head = Head;
Table.Wrapper = TableWrapper;

TableWrapper.defaultProps = {
  tableSpace: 'small'
};

export default Table;
