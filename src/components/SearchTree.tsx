/**
 * TODO: remove any type
 */

import React, { useState, useEffect } from 'react'
import {
  Input,
  Tree,
  TreeProps,
  Spin,
  Empty,
  InputProps,
  TreeDataNode,
} from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  .search-wrap {
    flex: none;
  }
  .tree-wrap {
    margin-top: 8px;
    flex: 1;
    overflow: auto;
    overflow-y: auto;
  }
`

const { Search } = Input

type TD = NonNullable<TreeProps['treeData']>

const getParentKey = (key: React.Key, tree: TD): React.Key | undefined => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

export interface Props<T extends TreeDataNode> extends TreeProps<T> {
  useDirectory?: boolean
  loading?: boolean
  empty?: React.ReactNode
  searchProps?: InputProps
}

function SearchTree<T extends TreeDataNode>(props: Props<T>) {
  const { loading, useDirectory, empty, searchProps, ...treeProps } = props
  const { treeData } = treeProps
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(
    treeProps.expandedKeys as any[],
  )
  const [autoExpandParent, setAutoExpandParent] = useState(false)
  const [data, setData] = useState(treeData || [])
  const C = useDirectory ? Tree.DirectoryTree : Tree

  const dataList = treeData!.reduce(
    (acc, cur) => [...acc, ...(cur.children || [])],
    [] as any[],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const expandedKeys = value
      ? dataList
          .map((item) => {
            if (
              typeof item.title === 'string' &&
              item.title.indexOf(value) > -1
            ) {
              return getParentKey(item.key, treeData as any)
            }
            return null
          })
          .filter((item, i, self) => item && self.indexOf(item) === i)
      : []

    const _data: any = treeData!
      .filter((n) =>
        !value ? true : n.children && expandedKeys.includes(n.key),
      )
      .map((node: any) => {
        return {
          ...node,
          children: node.children.filter((_node: any) => {
            return typeof _node.title === 'string'
              ? _node.title.indexOf(value) > -1
              : false
          }),
        }
      })

    setExpandedKeys(expandedKeys as string[])
    setAutoExpandParent(true)
    setData(_data)
  }

  const onExpand = (expandedKeys: any[]) => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  const _empty = empty || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

  useEffect(() => {
    if (treeProps.defaultExpandAll) {
      const keys = treeData?.map((data) => data.key)
      Array.isArray(keys) && setExpandedKeys(keys)
    }
  }, [treeData, treeProps.defaultExpandAll])

  useEffect(() => {
    treeData && setData(treeData)
  }, [treeData])

  return (
    <Container>
      <div className="search-wrap">
        <Search
          className="search"
          placeholder="search tree"
          {...searchProps}
          onChange={onChange}
        />
      </div>
      <div className="tree-wrap">
        {loading ? (
          <Spin />
        ) : data.length ? (
          <>
            <C
              {...treeProps}
              treeData={data}
              onExpand={onExpand}
              autoExpandParent={autoExpandParent}
              expandedKeys={expandedKeys}
            />
          </>
        ) : (
          _empty
        )}
      </div>
    </Container>
  )
}

export default SearchTree
