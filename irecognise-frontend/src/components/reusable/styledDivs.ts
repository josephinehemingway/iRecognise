// @ts-ignore
import styled from 'styled-components';
import {
  Row,
  Tabs,
} from 'antd'

export const Container = styled.div`
  width: ${(props: { width: string; }) => (props.width ? props.width : '100%')};
  height: ${(props: { height: string; }) => (props.height ? props.height : '100%')};
  height: ${(props: { height: string; }) => (props.height ? props.height : '100%')};
  display: flex;
  align-items: ${(props: { align: string; }) => (props.align ? props.align : 'center')};
  margin-top: ${(props: { margintop: string; }) => (props.margintop ? props.margintop : '0px')};
  margin-bottom: ${(props: { marginbottom: string; }) => (props.marginbottom ? props.marginbottom : '0px')};
  margin-right: ${(props: { marginright: string; }) => (props.marginright ? props.marginright : '0rem')};
  margin-left: ${(props: { marginleft: string; }) => (props.marginleft ? props.marginleft : '0rem')};
  padding: ${(props: { padding: string; }) => (props.padding ? props.padding : '0rem')};
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${(props: { bg: string; }) => (props.bg ? props.bg : '#00000000')};
`

export const RowContainer = styled(Row)`
&& {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: ${(props: { width: any; }) => (props.width ? props.width : '100%')};
  height: ${(props: { height: any; }) => (props.height ? props.height : '100%')};
  margin-top: ${(props: { margintop: string; }) => (props.margintop ? props.margintop : '20px')};
  margin-bottom:  ${(props: { marginbottom: string; }) => (props.marginbottom ? props.marginbottom : '0px')};
  margin-right: ${(props: { marginright: string; }) => (props.marginright ? props.marginright : '0px')};
  margin-left: ${(props: { marginleft: string; }) => (props.marginleft ? props.marginleft : '0px')};
}
`

export const StyledTabs = styled(Tabs)`
  && {
    width: 100%;
  }
`
