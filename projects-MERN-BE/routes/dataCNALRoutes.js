import Router from "router";
import express from "express";
import dataCNALController from "../controllers/dataCNALcontroller";
const router = express.Router();

const initWebDataCNALRoutes = (app) => {
  router.put("/data/updateCheckStreak", dataCNALController.updateCheckStreak);
  return router.use("/data", Router);
};
