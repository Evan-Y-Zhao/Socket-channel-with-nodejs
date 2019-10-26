# Socket-channel-with-nodejs

The project includes two parts, which is an express-based backend and a react socketmiddleware. When both runing, a component can run connectSocket function to connect to the backend.

The backend is built with nodejs as a dispacher to proxy the request to the corresponding microservice. The socket in backend uses rabitmq. After a rabitmq message is sent, the compoennt in frontend can receive the message via the socketmiddleware.
