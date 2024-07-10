/**
 * antd x6 自定义节点组件
 */

import { Wrap } from '@antv/x6-react-shape/es/wrap'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #999;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 34px;
  font-size: 14px;
  padding: 0 20px;

  .x6-node-selected & {
    border: 1px solid #f00;
  }
`

export default function NodeNormal(props: Wrap.Props) {
  return <Container>hello, sair</Container>
}
