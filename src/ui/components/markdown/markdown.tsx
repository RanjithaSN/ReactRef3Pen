import React, { FC } from 'react';
import ReactMarkdwon from 'react-markdown';
import Heading from 'ui/components/heading/heading';
import Stack from '../stack/stack';
import MarkdownParagraph from './markdown-paragraph';
import MarkdownTable from './markdown-table';
import MarkdownTableBody from './markdown-table-body';
import MarkdownTableCell from './markdown-table-cell';
import MarkdownTableHead from './markdown-table-head';
import MarkdownTableRow from './markdown-table-row';

const defaultRenderers = {
  table: MarkdownTable,
  tableHead: MarkdownTableHead,
  tableBody: MarkdownTableBody,
  tableRow: MarkdownTableRow,
  heading: Heading,
  paragraph: MarkdownParagraph,
  tableCell: MarkdownTableCell
};

interface MarkdownProps {
  source: string;
  renderers: Partial<typeof defaultRenderers>;
}

const Markdown: FC<MarkdownProps> = ({ source, renderers = {}, ...other }) => {
  if (!source) {
    return null;
  }
  return (
    <Stack>
      <ReactMarkdwon
        renderers={{
          ...defaultRenderers,
          ...renderers
        }}
        source={source}
        {...other}
      />
    </Stack>
  );
};

export default Markdown;
