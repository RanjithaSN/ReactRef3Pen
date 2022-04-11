import HtmlToReact from 'html-to-react';
import React from 'react';
import Link from 'selfcare-ui/src/components/link/link';

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const createProcessingInstructions = (customInstructions) => ([
  ...customInstructions,
  {
    shouldProcessNode: () => {
      return true;
    },
    processNode: processNodeDefinitions.processDefaultNode
  }
]);

export const getHelpProcessingInstructions = ({ helpPage, helpSubpagesToExclude, navigateToUrl }) => {
  const isParentOfHelpHyperlink = (node) => {
    const child = node.children && node.children[0];
    if (child && child.name === 'a' && child.attribs.href && child.attribs.href.startsWith(`/${helpPage}`)) {
      const arr = child.attribs.href.split('/').slice(1);
      return arr.length <= 3 && arr[0] === helpPage && !helpSubpagesToExclude.find((page) => (arr[1] === page));
    }
  };

  const processHelpHyperlink = (node, children) => {
    const child = children[0];
    return React.createElement(Link, {
      onClick: () => navigateToUrl(child.props.href)
    }, child.props.children);
  };

  return createProcessingInstructions([
    {
      replaceChildren: true,
      shouldProcessNode: isParentOfHelpHyperlink,
      processNode: processHelpHyperlink
    }
  ]);
};
