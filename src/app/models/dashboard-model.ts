import {StatusEnum} from "./status-enum";


export class DashboardModel {
  ip: string
  status : StatusEnum;
  os: string;
  localTime: number;
  timeZone: string;
  browser: string;
  resolution: string
}
