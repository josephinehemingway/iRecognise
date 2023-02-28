import { Button } from 'antd';
import 'antd/dist/antd.min.css';

// @ts-ignore
import styled from "styled-components";

export const StyledButton = styled(Button)`
  && {
    border-radius: 6px;
    background-color: rgba(121, 118, 232, 0.8);
    color: #fff;
    outline: none;
    border: 2px solid rgba(121, 118, 232, 0.8);;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    font-family: Lato, sans-serif;
    font-weight: 100;
    width: ${(props: { width: string; }) => (props.width ? props.width : '180px')};
    margin-right: ${(props: { right: string; }) => (props.right ? props.right : '0px')};
    margin-left: ${(props: { left: string; }) => (props.left ? props.left : '0px')};
    margin-bottom: ${(props: { bottom: string; }) => (props.bottom ? props.bottom : '0px')};
    margin-top: ${(props: { top: string; }) => (props.top ? props.top : '0px')};

    height: 40px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #7976e8;
      border: 2px solid #7976e8;
    }

    &:disabled,
    [disabled] {
      border: 2px solid #666666;
      background-color: #cccccc;
      color: #666666;
    }
  }
`;

export const BorderedButton = styled(Button)`
  && {
    border-radius: 6px;
    background: none;
    border: 2px solid #aaa8fc;
    color: #adace7;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    font-family: Lato, sans-serif;
    font-weight: 100;
    width: ${(props: { width: string; }) => (props.width ? props.width : '180px')};
    margin-right: ${(props: { right: string; }) => (props.right ? props.right : '0px')};
    margin-left: ${(props: { left: string; }) => (props.left ? props.left : '0px')};
    height: 40px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #7976e8;
      border: 2px solid #7976e8;
    }
  }
`;