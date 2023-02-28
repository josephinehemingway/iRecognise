// @ts-ignore
import styled from 'styled-components';
import {
  Tabs,
  Select,
  Input,
  Popconfirm, Table
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

export const StyledInput = styled(Input)`
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

interface StyledInputSearchProps {
  col: string | undefined;
  nohover: boolean | undefined;
}


export const StyledInputSearch = styled(Input)<
    Partial<StyledInputSearchProps>
    >`
  && {
    ${({col}: any) =>
            col === "white" &&
            `
        color: #fff;
        border: 1.2px solid #fff;
        .ant-input {
            background: none;
            color: #fff;
            margin-left: 0.5rem;
        }
        .anticon {
            color: #fff;
        }
        `}

    ${({nohover}: any) =>
            !nohover &&
            `
            img {
            -webkit-filter: opacity(60%);
        }

          img:hover {
            transform: scale(1.01);
            -webkit-filter: opacity(100%);
          }
        
        `}
    background: none;
    border-radius: 6px;
    width: ${(props: { width: string }) =>
            props.width ? props.width : "50%"};
    height: 40px;
    display: flex;
    flex-direction: row;
    padding: 0.25rem 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: Lato, sans-serif;
    font-size: 16px;

    &:hover {
      border: 2px solid rgba(121, 118, 232, 0.8);
    }
  }
`;

export const StyledPassword = styled(Input.Password)`
  & {
    width: 100%;
    border-radius: 5px;
    margin-bottom: ${(props: { marginbottom: string; }) => (props.marginbottom ? props.marginbottom : '0')};
    font-family: 'Lato', serif;
    font-size: 14px;
    
    &.ant-input-password {
      color: #fff !important;
      background: none !important;
    }

    & input {
      background: none !important;
      color: #fff !important;
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

export const StyledTag = styled.p`
    && {
      font-family: Lato, serif;
      color: ${(props: { color: string }) => (props.color ? props.color : '#fff')};
      font-size: ${(props: { fontsize: string }) => (props.fontsize ? props.fontsize : '16px')};
      text-align: ${(props: { align: string }) => (props.align ? props.align : 'center')};
      margin-bottom: ${(props: { marginbottom: string }) =>
    props.marginbottom ? props.marginbottom : "0"};
      margin-top: ${(props: { margintop: string }) =>
    props.margintop ? props.margintop : "0"};
      border: 1px solid;
      border-radius: 3px;
      border-color: ${(props: { color: string }) => (props.color ? props.color : '#fff')}
      line-height: 12px;
      padding: 3px;
    }
`

export const StyledTable = styled(Table)`
  & {
    & .ant-table-tbody .ant-table-cell {
      font-size: 16px;
      font-family: Lato, serif;
      color: #fff;
      background-color: #2B305C;
    }

    & .ant-table-thead .ant-table-cell {
      font-size: 17px;
      font-family: Lato Bold, serif;
      color: #fff;
      background-color: #2B305C;
    }

    && tbody > tr:hover > td {
      background: rgb(76, 75, 121);
    }
  }
`

export const StyledTableSlim = styled(Table)`
  & {
    & .ant-table-tbody .ant-table-cell {
      font-size: 14px;
      font-family: Lato, serif;
      color: #fff;
      background-color: #2B305C;
    }
    
    & .ant-table {
      line-height: 1
    }

    & .ant-table-thead .ant-table-cell {
      font-size: 16px;
      font-family: Lato Bold, serif;
      color: #fff;
      background-color: #2B305C;
    }

    && tbody > tr:hover > td {
      background: rgb(76, 75, 121);
    }
  }
`
