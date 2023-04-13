using Microsoft.AspNet.SignalR;
using SignalREjemplo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace SignalREjemplo.Controllers
{
    public class HomeController : Controller
    {
        public int Dossier(int cantDossiers)
        {
            Thread.Sleep(cantDossiers * 100);
            DossierHub.SendAlerta();
            return 1;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}