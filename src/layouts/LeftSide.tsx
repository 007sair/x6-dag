/**
 * 算子树组件，可拖拽算子到画布区域
 */
import React, { useMemo } from 'react'
import { useRequest } from 'ahooks'
import { useAtom } from 'jotai'
import type { DataNode } from 'antd/es/tree'
import * as service from '@/service/'
import SearchTree from '@/components/SearchTree'
import { nanoid } from '@/utils/tool'
import { graphAtom, dndAtom } from '@/store'

type TreeData = DataNode & {
  children?: TreeData[]
  data?: Operator
}

enum OperatorType {
  DATA = 1, //数据源
  TARGET = 2, //目标源
  COMMON = 3, //通用
  CUSTOM = 4, //自定义
  CUSTOM_TARGET = 5, //自定义目标源
  CUSTOM_COMMON = 6, //自定义通用
}

enum OperatorEnName {
  hive = 'hive',
  select = 'select',
  union = 'union',
  filter = 'filter',
  join = 'join',
  aggregate = 'aggregate',
  replace = 'replace',
  na = 'na',
  sql = 'sql',
  hdfs = 'hdfs',
  jimdb = 'jimdb',
  map = 'map',
  hbase = 'hbase',
  custom = 'custom',
  apiRpc = 'api',
}

// 根据算子类型获取ports
const getPortsByOperator = (operator: Operator) => {
  let ports = [
    { id: `port_${nanoid()}`, group: 'in' },
    { id: `port_${nanoid()}`, group: 'out' },
  ]
  const { componentNameEn, componentType } = operator

  //数据源和目标源的通用连接桩逻辑
  switch (componentType) {
    case OperatorType.DATA:
      ports = [{ id: `port_${nanoid()}`, group: 'out' }]
      break
    case OperatorType.TARGET:
      ports = [{ id: `port_${nanoid()}`, group: 'in' }]
      break
    default:
      break
  }

  //特殊算子的连接桩逻辑
  switch (componentNameEn) {
    case OperatorEnName.join:
      ports = [
        { id: `port_${nanoid()}`, group: 'in' },
        { id: `port_${nanoid()}`, group: 'in' },
        { id: `port_${nanoid()}`, group: 'out' },
      ]
      break
    default:
      break
  }

  //自定义算子的情况，作为目标源使用，更新自定义节点的引用记录
  if (componentType === OperatorType.CUSTOM) {
    ports = [{ id: `port_${nanoid()}`, group: 'out' }]
  }
  if (componentType === OperatorType.CUSTOM_TARGET) {
    ports = [{ id: `port_${nanoid()}`, group: 'in' }]
  }

  return ports
}

const OperatorList = () => {
  const [graph] = useAtom(graphAtom)
  const [dnd] = useAtom(dndAtom)
  const { data, loading } = useRequest(service.fetchOperatorList)

  const treeData: TreeData[] = useMemo(() => {
    if (!data) return []

    return data.map((item) => {
      return {
        title: item.componentTypeName,
        key: item.componentType,
        children: item.leafChild.map((child) => {
          return {
            title: child.componentNameZh,
            key: [item.componentType, child.id].join('-'),
            data: child,
          }
        }),
      }
    })
  }, [data])

  const startDrag = (dataNode: TreeData) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph || !dataNode.data) return

      // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
      const node = graph.createNode({
        shape: 'node-normal',
        ports: getPortsByOperator(dataNode.data),
      })

      dnd?.start(node, e.nativeEvent)
    }
  }

  return (
    <>
      <SearchTree
        defaultExpandAll
        useDirectory
        showIcon={false}
        selectable={false}
        loading={loading}
        // expandedKeys={expandedKeys}
        treeData={treeData}
        titleRender={(node) => {
          let attr: React.HTMLAttributes<HTMLDivElement> = {}
          if (!node.children) {
            attr = {
              onMouseDown: startDrag(node),
              style: {
                cursor: 'move',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              },
            }
          }
          return <div {...attr}>{node.title as React.ReactNode}</div>
        }}
        searchProps={{
          placeholder: '搜索算子',
        }}
      />
    </>
  )
}

export default OperatorList
