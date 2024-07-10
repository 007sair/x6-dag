/**
 * 封装fetch请求
 */
import queryString from 'query-string'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface Config extends RequestInit {
  method?: HttpMethod
  data?: any // method为GET时表示params、POST时表示body 上传文件时为FormData实例
  jApi?: boolean // 开启时使用 j-api 的 mock 功能
}

type Res<T> = {
  code: number
  data?: T
  message: string
}

const defaultConfig: Config = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

// 函数重载，判断返回的类型
function request<T>(url: string, config?: Config): Promise<T | undefined>
function request<T>(
  url: string,
  config?: Config,
  resData?: boolean,
): Promise<Res<T>>

// resData: 为true时，request函数会返回带有code、message、data的数据结构
async function request<T>(url: string, config?: Config, resData?: boolean) {
  try {
    config = { ...defaultConfig, ...config }

    const { data, ...init } = config // 此处的init为fetch的第2个参数

    // 完整url
    if (!/^http(s?):\/\//i.test(url)) {
      // url = config.jApi ? getJApiMockUrl(url, config.method || 'GET') : JDV_BASIC_API + url;
    }

    if (init.method === 'GET') {
      url = queryString.stringifyUrl({ url, query: data })
    } else {
      // 其他请求 放入body里面
      if (data instanceof FormData) {
        init.body = data
      } else {
        init.body = JSON.stringify(data)
      }
    }

    if (isFormData(init.body)) {
      /**
       * `FormData`与`headers`的坑：
       * 参考：https://zhuanlan.zhihu.com/p/34291688
       * 参考：https://stackoverflow.com/questions/17415084/multipart-data-post-using-python-requests-no-multipart-boundary-was-found/17438575
       */
      delete init.headers
    }

    const response = await fetch(url, init)

    if (!response.ok) {
      throw new Error('Network response was not OK')
    }

    const result: Res<T> = await response.json() // TODO: 完善返回格式

    switch (+result.code) {
      case 200:
        return resData ? result : result.data
      default:
        return Promise.reject({
          code: result.code || -1,
          message: result.message || '接口请求失败',
        })
    }
  } catch (error) {
    throw error
  }
}

export default request

/**
 * Determine if a value is a FormData
 */
function isFormData(val: unknown) {
  return typeof FormData !== 'undefined' && val instanceof FormData
}
