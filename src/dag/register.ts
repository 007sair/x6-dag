/**
 * 初始化 Graph
 */

import { Graph, Path } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import NodeNormal from './custom-nodes/NodeNormal'

// 注册节点
register({
  shape: 'node-normal',
  width: 200,
  height: 34,
  component: NodeNormal,
  ports: {
    groups: {
      in: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
      out: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
    },
  },
})

// 注册边
Graph.registerEdge(
  'edge-normal',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#979797',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 8,
        },
      },
    },
  },
  true,
)

// 注册连线
Graph.registerConnector(
  'ds-connector',
  (s, e) => {
    const offset = 4
    const deltaY = Math.abs(e.y - s.y)
    const control = Math.floor((deltaY / 3) * 2)

    const v1 = { x: s.x, y: s.y + offset + control }
    const v2 = { x: e.x, y: e.y - offset - control }

    return Path.normalize(`
      M ${s.x} ${s.y}
      L ${s.x} ${s.y + offset}
      C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
      L ${e.x} ${e.y}
    `)
  },
  true,
)
