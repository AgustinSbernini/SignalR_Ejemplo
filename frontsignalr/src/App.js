// import {
//     HubConnectionBuilder,
//     HubConnectionState,
//     HubConnection,
// } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr"
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    const [cantDossiers, setCantDossiers] = useState(0);

    useEffect(() => {
      setUpSignalRConnection()
    }, [])

    const setUpSignalRConnection = async () => {
      const connection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:44304/Home/Dossier", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          })
          .withAutomaticReconnect()
          .build();
  
      connection.on("send", (data) => {
          console.log("send", data);
      });

      try {
        await connection.start()
      } catch (err) {
        console.log(err)
      }

      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.invoke('alertar', cantDossiers).catch((err) => {
          return console.error(err.toString());
        });
      }
  
      console.log("connection", connection);
      return connection;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("cantDossiers", cantDossiers);
    };
    return (
        <>
            <h2>Ingrese la cantidad de dossier que desea generar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setCantDossiers(e.target.value)}
                    type="number"
                    // ref={ref}
                />
                <button type="submit">Generar</button>
                {/* <ul id="discussion"></ul> */}
            </form>
        </>
    );
}

export default App;
