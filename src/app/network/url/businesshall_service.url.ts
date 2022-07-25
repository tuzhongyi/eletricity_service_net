export const basic_url = '/api/howell/ver10';
export const aiop_service_url = basic_url + '/aiop_service';
export const businesshall_service_url = basic_url + '/businesshall_service';

export interface InnerUrl {
  basic(): string;
}
