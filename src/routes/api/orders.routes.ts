import authenticationMiddlware from "../../middleware/authentication.middleware";
import * as controllers from "../../controllers/orders.controllers";
export const orderRoutes = express.Router();
import express from "express";


orderRoutes.route("/").post( controllers.create);
orderRoutes
  .route("/current")
  .get(authenticationMiddlware, controllers.CurrentOrders);
orderRoutes
  .route("/completed")
  .get(authenticationMiddlware, controllers.CompletedOrders);
orderRoutes.route("/:id").get(authenticationMiddlware, controllers.show);
orderRoutes.route("/").get(authenticationMiddlware, controllers.index);