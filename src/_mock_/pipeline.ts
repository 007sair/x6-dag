/**
 * 驾驶舱
 */
import Mock from 'mockjs'

export default [
  {
    url: '/mock/pipeline/dag',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        data: {
          nodes: [
            {
              shape: 'node-normal',
              data: {
                name: 'hive_hf2p0k',
                alias: 'hive',
                id: 1,
                type: 100,
                properties: {
                  metadataCluster: 'ms-hope',
                  db: 'app',
                  table: 'app_shopping_cart_recommended_price',
                },
              },
              position: { x: 410, y: 80 },
              id: 'node_5r0yuuptz7',
              ports: {
                groups: {
                  in: { position: 'top' },
                  out: { position: 'bottom' },
                },
                items: [{ id: 'port_ggj6ilu02u', group: 'out' }],
              },
              zIndex: 1,
            },
            {
              shape: 'node-normal',
              data: {
                name: 'select_row2g5',
                alias: 'select',
                id: 3,
                type: 1,
                properties: {
                  selectConf: [
                    {
                      fieldName: 'cid3',
                      alias: 'cid3',
                      description: '三级类目',
                      sqlCheck: 'true',
                      type: 'custom',
                      fieldFunc: 'cid3',
                    },
                    {
                      fieldName: 'sku_id',
                      alias: 'sku_id',
                      description: 'sku',
                      sqlCheck: 'true',
                      type: 'custom',
                      fieldFunc: 'sku_id',
                    },
                    {
                      fieldName: 'dt',
                      alias: 'dt',
                      description: '',
                      sqlCheck: 'true',
                      type: 'custom',
                      fieldFunc: 'dt',
                    },
                  ],
                },
              },
              position: { x: 290, y: 210 },
              id: 'node_vhro8qt1ni',
              ports: {
                groups: {
                  in: { position: 'top' },
                  out: { position: 'bottom' },
                },
                items: [
                  { id: 'port_sn6mghwl4j', group: 'in' },
                  { id: 'port_f2i05j2qxz', group: 'out' },
                ],
              },
              zIndex: 2,
            },
            {
              shape: 'node-normal',
              data: {
                name: 'na_l3qiyy',
                alias: 'na',
                id: 9,
                type: 8,
                properties: {},
              },
              position: { x: 410, y: 330 },
              id: 'node_a4khw6fjkn',
              ports: {
                groups: {
                  in: { position: 'top' },
                  out: { position: 'bottom' },
                },
                items: [
                  { id: 'port_fmsasr1mkw', group: 'in' },
                  { id: 'port_otx6umxlcz', group: 'out' },
                ],
              },
              zIndex: 3,
            },
            {
              shape: 'node-normal',
              data: {
                name: 'hive_wiuny6',
                alias: 'hive',
                id: 2,
                type: 100,
                properties: {},
              },
              position: { x: 420, y: 430 },
              id: 'node_o75508wpbu',
              ports: {
                groups: {
                  in: { position: 'top' },
                  out: { position: 'bottom' },
                },
                items: [{ id: 'port_9bytq15gfi', group: 'in' }],
              },
              zIndex: 4,
            },
          ],
          edges: [
            {
              shape: 'edge-normal',
              id: 'edge_68fk82pjup',
              source: { port: 'port_ggj6ilu02u', cell: 'node_5r0yuuptz7' },
              attrs: { line: { strokeDasharray: '' } },
              zIndex: -1,
              target: { port: 'port_sn6mghwl4j', cell: 'node_vhro8qt1ni' },
            },
            {
              shape: 'edge-normal',
              id: 'edge_cmghbfjqlx',
              source: { port: 'port_f2i05j2qxz', cell: 'node_vhro8qt1ni' },
              attrs: { line: { strokeDasharray: '' } },
              zIndex: -1,
              target: { port: 'port_fmsasr1mkw', cell: 'node_a4khw6fjkn' },
            },
            {
              shape: 'edge-normal',
              id: 'edge_9crhtgnyzt',
              source: { port: 'port_otx6umxlcz', cell: 'node_a4khw6fjkn' },
              attrs: { line: { strokeDasharray: '' } },
              zIndex: -1,
              target: { port: 'port_9bytq15gfi', cell: 'node_o75508wpbu' },
            },
          ],
        },
        message: '成功',
        success: true,
      })
    },
  },
]
