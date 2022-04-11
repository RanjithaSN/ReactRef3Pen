import styled, { createGlobalStyle } from 'styled-components';

import { general, spacing, mediaContextSize } from 'ui/theme/theme.helpers';
import Card from 'selfcare-ui/src/components/card/card';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import Footer from '../footer/footer.contextual';

export const GlobalStyle = createGlobalStyle`
  html, body, #react-root {
    height: 100%;
  }
`;

export const PageLayoutContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageLayoutFooter = styled(Footer)`
  width: 100%;
`;

export const PageLayoutContent = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  position: relative;
  min-height: 0;

  .scroll-pane {
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .main {
      flex-grow: 1;
    }
  }
`;

export const CookieCard = styled(Card)`
  background-color: ${general('system', 'info')};
  display: flex;
  flex-wrap: wrap;
`;

export const CookieCardHeading = styled(Heading)`
  flex-grow: 1;
  width: 100%;
  padding-bottom: ${spacing('small')};
`;

export const CookieCardInfo = styled(Heading)`
  padding-right: ${spacing('extraSmall')};

  @media screen and (max-width: ${mediaContextSize('mqLargeStart')}) {
    flex-grow: 1;
    width: 100%;
    padding-bottom: ${spacing('small')};
  }
`;

export const CookieCardLink = styled(Link)`
  text-align: left;

  @media screen and (max-width: ${mediaContextSize('mqLargeStart')}) {
    width: 100%;
    flex-grow: 1;
  }
`;


