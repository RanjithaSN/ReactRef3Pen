import styled from 'styled-components';
import { color, general, spacing, rhythm } from 'ui/theme/theme.helpers';
import Flag from 'selfcare-ui/src/components/flag/flag';
import IconAngleLeft from 'selfcare-ui/src/icons/react-icons/angle-left';
import IconArrowThinLeft from 'selfcare-ui/src/icons/react-icons/arrow-thin-left';

export const Container = styled.div`
  margin-top: ${spacing('medium')};
  padding: 1rem 0;

  &.show-arrow {
    &.dark {
      background: ${color('canvasBlack')};
    }

    .c-flag {
      &__icon,
      &__text {
        color: ${color('textDark')};

        .dark& {
          color: ${color('textWhite')};
        }
      }

      &__text {
        font-size: 1rem;
      }
    }

    .c-flag__icon {
      margin-right: 0.625rem;
    }

    .c-header .c-header-back-banner& {
      border: 0;

      &.dark {
        background-color: ${color('canvasBlack')};
      }
    }
  }
`;

export const BackBannerButton = styled(Flag)`
  padding-bottom: 0;
  font-size: ${rhythm('delta')};
  color: ${general('text', 'light')};
`;

export const BackBannerIcon = styled(IconAngleLeft)`
  padding-right: 0;
`;

export const BackBannerArrowIcon = styled(IconArrowThinLeft)`
  padding-right: 0;
`;
