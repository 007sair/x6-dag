/**
 * 算子树叶子节点配置
 */
interface Operator {
  batchStreamFlag: number
  componentEngine: number
  componentGroup: number
  componentGroupName: string
  componentLogic: string
  componentNameEn: string
  componentNameZh: string
  componentType: number
  componentTypeName: '数据源'
  componentVersion: number
  description: string
  frontendFormSchema: string
  id: number
  inputPortMax: number
  inputPortMin: number
  isPublic: number
  isUsed: number
  operatorType: number
  pipelineType: number
  projectSpaceId: number
  properties: string
}

/**
 * 算子树节点配置
 */
interface OperatorGroup {
  componentType: number
  componentTypeName: string
  leafChild: Operator[]
}
