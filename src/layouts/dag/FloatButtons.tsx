import { Button, Tooltip, theme } from 'antd'
import {
  AimOutlined,
  CompressOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import { Graph } from '@antv/x6'
import styled from 'styled-components'

const { defaultAlgorithm, defaultSeed } = theme

const mapToken = defaultAlgorithm(defaultSeed)

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  border: 1px solid ${mapToken.colorBorder};
  background-color: ${mapToken.colorBgBase};
`

type ButtonConfig = {
  title: string
  icon: typeof ZoomInOutlined
  onClick: React.HTMLAttributes<Element>['onClick']
}

type Props = {
  graph: Graph
}

export default function FloatButtons({ graph }: Props) {
  const buttons: ButtonConfig[] = [
    {
      title: '放大',
      icon: ZoomInOutlined,
      onClick: () => graph.zoom(0.1),
    },
    {
      title: '缩小',
      icon: ZoomOutOutlined,
      onClick: () => graph.zoom(-0.1),
    },
    {
      title: '缩放到1:1',
      icon: CompressOutlined,
      onClick: () => graph.zoomTo(1),
    },
    {
      title: '居中',
      icon: AimOutlined,
      onClick: () => graph.centerContent(),
    },
  ]

  return (
    <Container>
      {buttons.map((btn) => {
        return (
          <Tooltip key={btn.title} title={btn.title} placement="bottom">
            <Button
              size="small"
              type="text"
              icon={<btn.icon style={{ fontSize: 12 }} />}
              onClick={btn.onClick}
            />
          </Tooltip>
        )
      })}
    </Container>
  )
}
