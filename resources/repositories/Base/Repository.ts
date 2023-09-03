export interface VisitOptions {
  onBefore: Function | undefined;
  onStart: Function | undefined;
  onProgress: Function | undefined;
  onFinish: Function | undefined;
  onCancel: Function | undefined;
  onSuccess: Function | undefined;
  onError: Function | undefined;
}

export interface InertiaFormProps {
  get(url: string, options?: Partial<VisitOptions>): void;
  post(url: string, options?: Partial<VisitOptions>): void;
  put(url: string, options?: Partial<VisitOptions>): void;
  patch(url: string, options?: Partial<VisitOptions>): void;
  delete(url: string, options?: Partial<VisitOptions>): void;
  data(): any;
}

export interface RepositoryInterface {
  endpoint: string | null;
  form: InertiaFormProps | null;
  fetch(params: any): Promise<any>;
  find(id: string|number): Promise<any>;
  post(params: any): Promise<any>;
  put(id: string|number, params: any): Promise<any>;
  delete(id: string|number): Promise<any>;
}
