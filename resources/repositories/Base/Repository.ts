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
}

export interface RepositoryInterface {
  endpoint: string | null;
  form: InertiaFormProps | null;
  fetch(form: InertiaFormProps): Promise<any>;
  find(form: InertiaFormProps, id: string|number): Promise<any>;
  post(form: InertiaFormProps): Promise<any>;
  put(form: InertiaFormProps, id: string|number): Promise<any>;
  delete(form: InertiaFormProps, id: string|number): Promise<any>;
}
