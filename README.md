# TA9Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:60223/`. The app will automatically reload if you change any of the source files.


You can find all constants, including WebSocket server URL, topic name, connection heartbeat and reconnection delay. 

Angular project for previous written Dashboard application with Websocket/RabbitMQ/Docker-compose

It connects to the DashboardCompose Spring Boot server via WebSocket and subscribies to message topic, for sending and receiving messages via ng2-stompjs protocol.



While disconnected, you will see this UI.
![2021-09-02 (2)](https://user-images.githubusercontent.com/64583883/131801494-8e06b811-1963-4ccb-8319-cbae37208b07.png)



Uppon connection, you should see list of all connected/disconnected users.
![2021-09-02](https://user-images.githubusercontent.com/64583883/131800829-1f4765f4-1e86-40f5-a71e-19611f1f0d21.png)






