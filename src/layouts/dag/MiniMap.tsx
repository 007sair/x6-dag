import { useEffect, useRef } from 'react'
import { Graph } from '@antv/x6'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Scroller } from '@antv/x6-plugin-scroller'

type Props = {
  graph: Graph
}

export default function Map({ graph }: Props) {
  const ref = useRef(null)

  useEffect(() => {
    graph
      .use(
        new Scroller({
          graph,
          enabled: true,
          pannable: true,
          autoResize: true,
        }),
      )
      .use(
        new MiniMap({
          container: ref.current!,
        }),
      )
  }, [graph])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
      }}
    />
  )
}
