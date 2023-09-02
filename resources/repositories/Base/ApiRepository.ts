import { InertiaFormProps, RepositoryInterface } from 'Resources/repositories/Base/Repository'

export default abstract class ApiRepository implements RepositoryInterface {
  public endpoint: string | null = null
  public form: InertiaFormProps | null = null

  constructor (endpoint: string) {
    this.endpoint = endpoint
  }

  public fetch (form: InertiaFormProps) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.get(`${this.endpoint}`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }

  public find (form: InertiaFormProps, id: string|number) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.get(`${this.endpoint}/${id}`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }

  public post (form: InertiaFormProps) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.post(`${this.endpoint}`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }

  public put (form: InertiaFormProps, id: string|number) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.put(`${this.endpoint}/${id}`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }

  public delete (form: InertiaFormProps, id: string|number) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.delete(`${this.endpoint}/${id}`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
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
