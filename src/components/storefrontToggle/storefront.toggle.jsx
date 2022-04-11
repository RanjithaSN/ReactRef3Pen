import { useToggleMode } from '../../hooks/storefrontModeHooks/student.mode.hooks';
import { getSiteScrollPosition } from '../../helpers/site.scroll.helpers';
import Radio from 'selfcare-ui/src/components/radio/radio';
import RadioGroup from 'selfcare-ui/src/components/radioButtonGroup/radio.button.group';
import React, { useCallback } from 'react';
import compose from 'ramda/src/compose';
import { withI18n } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ToggleWrapper = styled.div`
  max-width: calc(250px + 1rem * 2);
`;

const StorefrontToggle = ({ t, options, setScroll }) => {
  const [activeMode, setActiveMode] = useToggleMode(t);

  const handleChange = useCallback(
    (ev) => {
      const index = ev.target.getAttribute('index');
      const scroll = getSiteScrollPosition();

      setActiveMode(options[index].route);
      setScroll(scroll);
    },
    [setActiveMode, options, setScroll]
  );

  return (
    <ToggleWrapper>
      <RadioGroup name="toggle" onChange={handleChange}>
        {options.map((element, index) => (
          <Radio
            className="secondary"
            id={element.id}
            key={element.id}
            value={element.value}
            index={index}
            checked={activeMode === element.value}
          >
            {element.text}
          </Radio>
        ))}
      </RadioGroup>
    </ToggleWrapper>
  );
};

StorefrontToggle.propTypes = {
  t: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.string,
      value: PropTypes.string,
      route: PropTypes.string
    })
  ),
  setScroll: PropTypes.func.isRequired
};

export default compose(withI18n())(StorefrontToggle);
