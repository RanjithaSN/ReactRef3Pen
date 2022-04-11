import styled from 'styled-components';
import { mediaContextSize, spacing } from 'ui/theme/theme.helpers';

export const StyledPageContent = styled.article`
  width: 100%;

  .c-page-content__container {
    height: 100%;
  }

  .c-page-content__container--flush-no-max .c-page-content__main {
    padding: 0;
  }

  @media screen and (min-width: ${mediaContextSize('mqLargeStart')}) {
    .c-page-content__container {
      display: grid;

      &.c-page-content__container--flush {
        grid-template: "main" / 100%;
      }

      &.c-page-content__container--flush-no-max {
        grid-template: "main" / 100%;
        max-width: none;
      }

      &.c-page-content__container--one-column {
        grid-template: "main" / 100%;
      }

      &.c-page-content__container--two-column {
        grid-template: "main main_two" / 60% 40%;
      }

      &.c-page-content__container--aside-left {
        grid-template: "aside main" / 35% 65%;

        .c-page-content__aside {
          border-right: 1px solid general(border, light);
        }
      }

      &.c-page-content__container--aside-right {
        grid-template: "main aside" / 60% 35%;
        grid-gap: 5%;

        .c-page-content__aside {
          border-left: 1px solid general(border, light);
        }
      }
    }
  }
`;

export const StyledPageContentMain = styled.main`
  padding-top: ${spacing('extraExtraLarge')};
  padding-bottom: ${spacing('extraLarge')};
  padding-left: ${spacing('medium')};
  padding-right: ${spacing('medium')};

  &.c-page-content__main--isShop {
    display: grid;
    padding-top: ${spacing('large')};
  }

  @media screen and (max-width: ${mediaContextSize('mqMediumStart')}) {
    padding-left: ${spacing('small')};
    padding-right: ${spacing('small')};
  }

  @media screen and (min-width: ${mediaContextSize('mqLargeStart')}) {
    grid-area: main;

    .c-page-content__main + .c-page-content__main {
      grid-area: main_two;
    }
  }

  @media screen and (min-width: ${mediaContextSize('mqMaxWidth')}) {
    padding-left: ${spacing('large')};
    padding-right: ${spacing('large')};
  }
`;

export const StyledPageContentAside = styled.article`
  padding-top: ${spacing('extraExtraLarge')};
  padding-bottom: ${spacing('extraLarge')};
  padding-left: ${spacing('medium')};
  padding-right: ${spacing('medium')};

  @media screen and (max-width: ${mediaContextSize('mqMediumStart')}) {
    padding-left: ${spacing('small')};
    padding-right: ${spacing('small')};
  }

  @media screen and (min-width: ${mediaContextSize('mqLargeStart')}) {
    grid-area: aside;
    padding-left: ${spacing('large')};
    padding-right: ${spacing('large')};
  }

  @media screen and (min-width: ${mediaContextSize('mqMaxWidth')}) {
    padding-left: ${spacing('large')};
    padding-right: ${spacing('large')};
  }
`;
