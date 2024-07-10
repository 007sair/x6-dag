import { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { graphAtom, dndAtom } from '@/store'
import { useSize, useRequest } from 'ahooks'
import { Button, Modal } from 'antd'
import { Graph } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import MiniMap from './MiniMap'
import FloatButtons from './FloatButtons'
import * as service from '@/service/'

// 初始化 Graph 信息
import '@/dag/register'

export default function DAG() {
  const [graph, setGraphAtom] = useAtom(graphAtom)
  const [, setDndAtom] = useAtom(dndAtom)
  const ref = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const size = useSize(container)

  useRequest(service.fetchPipelineDAG, {
    onSuccess(data) {
      if (graph) {
        console.log(data)
        graph.fromJSON(data as any)
      }
    },
  })

  // 初始化 graph 实例
  useEffect(() => {
    if (!container.current) return
    const { offsetWidth, offsetHeight } = container.current
    const graph = new Graph({
      container: ref.current!,
      width: offsetWidth,
      height: offsetHeight,
      background: {
        color: '#F2F7FA',
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      panning: true,
      connecting: {
        snap: {
          radius: 20,
        },
        allowBlank: false,
        allowLoop: false,
        allowEdge: false,
        allowNode: false,
        allowMulti: 'withPort',
        connector: 'ds-connector',
        highlight: true,
        connectionPoint: 'anchor',
        createEdge() {
          return this.createEdge({
            shape: 'edge-normal',
            attrs: {
              line: {
                strokeDasharray: '5 5',
              },
            },
          })
        },
        validateMagnet({ magnet }) {
          // 节点上方的连接桩无法创建连线
          return magnet.getAttribute('port-group') !== 'in'
        },
        validateConnection({
          sourceCell,
          targetCell,
          sourceMagnet,
          targetMagnet,
        }) {
          // 不能连接自身
          if (sourceCell === targetCell) {
            return false
          }

          // 只能从 bottom 连接桩开始连接，连接到 top 连接桩
          if (
            !sourceMagnet ||
            sourceMagnet.getAttribute('port-group') === 'in'
          ) {
            return false
          }
          if (
            !targetMagnet ||
            targetMagnet.getAttribute('port-group') !== 'in'
          ) {
            return false
          }

          // 不能重复连线
          // const edges = this.getEdges()
          // const portId = targetMagnet.getAttribute('port')
          // if (edges.find((edge) => edge.getTargetPortId() === portId)) {
          //   return false
          // }

          return true
        },
      },
      highlighting: {
        // 连接桩可以被连接时在连接桩外围围渲染一个包围框
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#47C769',
            },
          },
        },
        // 连接桩吸附连线时在连接桩外围围渲染一个包围框
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },
    })

    graph
      .use(
        new Selection({
          enabled: true,
          showNodeSelectionBox: true,
          pointerEvents: 'none', // 解决 node 事件冲突问题
        }),
      )
      .use(
        new Keyboard({
          enabled: true,
        }),
      )

    const dnd = new Dnd({
      target: graph,
    })

    // delete
    graph.bindKey(['backspace', 'delete'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        Modal.confirm({
          title: '确认删除所选算子？',
          onOk: () => {
            graph.removeCells(cells)
          },
          okText: '确定',
          cancelText: '取消',
        })
      }
    })

    graph.on('node:mouseenter', ({ node }) => {
      node.ports.items.forEach((port) => {
        if (!port.id) return
        node.portProp(port.id, 'attrs/circle', {
          fill: '#fff',
          stroke: '#85A5FF',
        })
      })
    })

    graph.on('node:mouseleave', ({ node }) => {
      node.ports.items.forEach((port) => {
        if (!port.id) return
        node.portProp(port.id, 'attrs/circle', {
          fill: 'transparent',
          stroke: 'transparent',
        })
      })
    })

    graph.on('edge:connected', ({ edge }) => {
      edge.attr({
        line: {
          strokeDasharray: '',
        },
      })
    })

    graph.on('edge:dblclick', ({ edge }) => {
      graph.removeEdge(edge)
    })

    setGraphAtom(graph)
    setDndAtom(dnd)
  }, [])

  useEffect(() => {
    if (size && graph) {
      graph.resize(size?.width, size?.height)
    }
  }, [size])

  return (
    <>
      <div style={{ position: 'fixed', top: 10, right: 20, zIndex: 10 }}>
        <Button
          onClick={() => {
            console.log(graph?.toJSON)
          }}
        >
          toJSON
        </Button>
      </div>
      <div ref={container} style={{ display: 'flex', height: '100%' }}>
        <div ref={ref}></div>
      </div>

      {graph && <MiniMap graph={graph} />}
      {graph && <FloatButtons graph={graph} />}
    </>
  )
}
