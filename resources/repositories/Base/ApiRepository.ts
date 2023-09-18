import { InertiaFormProps, RepositoryInterface } from 'Resources/repositories/Base/Repository'
import axios, { AxiosInstance, CustomParamsSerializer } from 'axios'

export default abstract class ApiRepository implements RepositoryInterface {
  public axios: AxiosInstance = axios
  public endpoint: string | null = null
  public form: InertiaFormProps | null = null

  constructor (endpoint: string) {
    this.endpoint = endpoint
  }

  public autocomplete (params: any = null, paramsSerializer: CustomParamsSerializer|undefined = undefined) {
    return this.axios.get(`${this.endpoint}/autocomplete`, {
      params,
      paramsSerializer,
    })
  }

  public fetch (params: any = null, paramsSerializer: CustomParamsSerializer|undefined = undefined) {
    return this.axios.get(`${this.endpoint}`, {
      params,
      paramsSerializer,
    })
  }

  public find (id: string|number, params: any = null, paramsSerializer: CustomParamsSerializer|undefined = undefined) {
    if (params) {
      return this.axios.get(`${this.endpoint}/${id}`, {
        params,
        paramsSerializer,
      })
    }

    return this.axios.get(`${this.endpoint}/${id}`)
  }

  public post (params: any = null) {
    return this.axios.post(`${this.endpoint}`, params)
  }

  public put (id: string|number, params: any = null) {
    return this.axios.put(`${this.endpoint}/${id}`, params)
  }

  public delete (id: string|number) {
    return this.axios.delete(`${this.endpoint}/${id}`)
  }

  public parseToFormData (params: Record<string, any>) {
    const formData = new FormData()
    Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value[0]?.file instanceof File) {
          formData.append(key, value[0].file)
        }
      }

      if (value !== undefined) {
        formData.append(key, value)
      }
    })
    return formData
  }

  public async cleanRequest (method: string, url: string, headers: Record<string, any> = {}, body = null) {
    return await new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      // xhr.timeout = 1500; // time in milliseconds
      xhr.open(method, url)
      Object.entries(headers).map(([key, value]) => xhr.setRequestHeader(key, value))
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          try {
            resolve(JSON.parse(xhr.response))
          } catch (error) {
            resolve(xhr.response)
          }
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          })
        }
      }
      // xhr.ontimeout = (e) => {
      //   xhr.onload();
      // };
      // xhr.onreadystatechange = function () {
      //   console.log('xhr.readyState :>> ', xhr.readyState);
      //   if (xhr.readyState == 4) {
      //     alert("ready state = 4");
      //   }
      // };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        })
      }
      xhr.send(body)
    })
  }
}
