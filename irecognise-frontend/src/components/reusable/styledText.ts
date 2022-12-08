// @ts-ignore
import styled from 'styled-components'


export const StyledSectionHeading = styled.div`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${(props: { margintop: string }) => (props.margintop ? props.margintop : '0')};
    margin-bottom: ${(props: { marginbottom: string }) => (props.marginbottom ? props.marginbottom : '0.5rem')};
    color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
    font-weight: 600;
    font-size: calc(20px + .3vw);
    font-family: Lato Bold, serif;
    width: 100%;
  }
`

export const StyledTitle = styled.p`
    && {
      font-family: Lato Bold, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '16px')};;
      text-align: center;
      margin-bottom: 0;
      margin-top: 0;
    }
`


export const StyledLink = styled.a`
  && {
    margin-top: ${(props: { margintop: string }) => (props.margintop ? props.margintop : '0.25rem')};
    margin-bottom: ${(props: { marginbottom: string }) => (props.marginbottom ? props.marginbottom : '0')};
    font-family: Lato, serif;
    color: ${(props: { color: string }) => (props.color ? props.color : '#ffffff80')};
    font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '16px')};;
    text-align: center;

    &:hover {
      color: #fff;
    }
  }
`

export const StyledLabel = styled.p`
    && {
      font-family: Lato, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#ffffff80')};
      //font-weight: 600;
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '12px')};;
      text-align: end;
      margin-bottom: 0;
      margin-top: 0;
    }
`

export const StyledText = styled.p`
    && {
      font-family: Lato, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '14px')};;
      text-align: center;
      margin-bottom: 0;
      margin-top: 0;
    }
`


