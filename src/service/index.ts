import request from '@/utils/request'

export const fetchOperatorList = () => {
  return request<Array<OperatorGroup>>('/mock/operator/list')
}

export const fetchPipelineDAG = () => {
  return request('/mock/pipeline/dag')
}
