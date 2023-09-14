export interface Endpoint {
  name: string;
  url: string;
  log: (body: any) => void;
};
