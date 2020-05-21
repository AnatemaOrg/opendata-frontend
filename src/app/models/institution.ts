import { Observable } from 'rxjs';

export interface Institution {
  type: "",
  id: string;
  attributes: {
    name: string;
    ['alac-funde-id']: string;
    ['average-response']: number;
    ['total-inforequest']: number;
    ['total-status']: any;
    ['total-result']: any;
  },
  links: {
    any;
  }
} 
