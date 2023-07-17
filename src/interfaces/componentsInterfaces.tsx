
export interface Message {
  title: string
  message: string
}

export interface IpList {
  id: number;
  ip: string;
  country: string;
  isoCode: string;
  currency: string;
  flag: string;
  status: string;
  isDeleted: boolean;
}