using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace SignalREjemplo.Models
{
    public class DossierHub : Hub
    {
        public void Alertar(int cantDossier)
        {
            Thread.Sleep(cantDossier * 100);
            Clients.Caller.DarAlerta();
        }
        public static void SendAlerta()
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<DossierHub>();
            context.Clients.All.darAlerta();
        }
    }
}