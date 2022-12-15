// @ts-ignore
import styled from 'styled-components';
import {
  Tabs,
  Select,
  Input,
  Popconfirm
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

export const StyledTabs = styled(Tabs)`
  && {
    width: 100%;
  }
`

interface StyledSelectProps {
  width: string | undefined
  required: boolean
}

export const StyledSelect = styled(Select)<Partial<StyledSelectProps>>`
  && {
    width: ${(props: { width: string; }) => (props.width ? props.width : '100%')};
    margin-bottom: ${(props: { marginbottom: string; }) => (props.marginbottom ? props.marginbottom : '0.25rem')};
    font-family: 'Lato', serif;
    font-size: 14px;
    background: none;
    color: #fff;
    
    & .ant-select-selector {
      border-radius: 5px;
      background: none;
    }
    
    & .ant-select-arrow {
      color: #fff;
    }
  }
`

export const StyledTextArea = styled(Input.TextArea)`
  & {
    width: 100%;
    border-radius: 5px;
    margin-bottom: ${(props: { marginbottom: string; }) => (props.marginbottom ? props.marginbottom : '0')};
    font-family: 'Lato', serif;
    font-size: 14px;
    
    &.ant-input {
      color: #fff !important;
      background: none !important;
    }

  }
`

export const StyledPopConfirm = styled(Popconfirm)`
  & {
    font-family: 'Lato', serif;

    & .ant-popover {
      background-color: #000 !important;
      border-radius: 5px;
    }

    & .ant-btn-primary {
      background: rgba(121, 118, 232, 0.8) !important;
    }
  }
`