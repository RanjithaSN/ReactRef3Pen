import styled from 'styled-components';
import React from 'react';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';

const Wrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: center;
  padding: 10px;
  width: 80px;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  flex-shrink: 1;
  min-height: 0;
  max-width: 100%;
`;

const TextWrapper = styled(Paragraph)`
  font-size: 8px;
  font-weight: normal;
  letter-spacing: 0.1px;
  line-height: 9px;
  margin-top: 1px;
  margin-bottom: 1px;
  text-align: center;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const LogoBadge = (props: {text: string, image: string}) => (
  <Wrapper>
    <TextWrapper>
      {props.text.length ? <TextWrapper>{props.text}</TextWrapper> : null}
    </TextWrapper>
    <IconWrapper>
      <Img src={props.image}/>
    </IconWrapper>
  </Wrapper>
);

export default LogoBadge;
