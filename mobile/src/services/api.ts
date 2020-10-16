import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.13:3333'

  /*
    Dispositivo Fisico
    http://192.168.0.13:3333

    Emulador Android
    http://10.0.0.2:3333

    adb reverse tcp:3333 tcp:3333
    http://ipdamaquina:3333
  */
});

export default api;
