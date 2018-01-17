export interface IService {
  id: string;
  image: string;
  hostname: string;
  ports: string[];
  environment: { [key: string]: string }
}