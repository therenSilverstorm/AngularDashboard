import * as SockJS from 'sockjs-client';


export function socketProvider() {
  return new SockJS('http://localhost:8080//gkz-stomp-endpoint');
}


