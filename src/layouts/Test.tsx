import React from 'react'

export interface ListProps<T> {
  visible: boolean
  list: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

export function List<T>(props: ListProps<T>) {
  return <div />
}
