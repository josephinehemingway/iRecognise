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

export const StyledDrawerHeading = styled.div`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${(props: { margintop: string }) => (props.margintop ? props.margintop : '0')};
    margin-bottom: ${(props: { marginbottom: string }) => (props.marginbottom ? props.marginbottom : '0')};
    font-family: Lato Bold, serif;
    color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
    font-weight: 600;
    font-size: calc(15px + .3vw);
    line-height: calc(20px + .3vw);
    width: 100%;
  }
`

export const StyledLink = styled.h3`
  && {
    margin-top: ${(props: { margintop: string }) => (props.margintop ? props.margintop : '0')};
    margin-bottom: ${(props: { marginbottom: string }) => (props.marginbottom ? props.marginbottom : '0')};
    font-family: Lato, serif;
    color: ${(props: { color: string }) => (props.color ? props.color : '#ffffff80')};
    font-weight: 600;
    font-size: calc(16px + .5vw);
    text-align: center;
  }
`
