/* eslint-disable import/extensions */
import { Router } from "express";
import { getAll, getAllLocations } from "../../services/locations";
import { asyncHandler } from "../../utils/index";

const router = Router();

export default (app: Router) => {
  app.use("/locations", router);

  // 로케이션 리스트 페이지, 인덱스 페이지
  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 9;

      const locations = await getAll(page, perPage);
      res.status(200).json(locations);
    }),
  );

  router.get(
    "/all",
    asyncHandler(async (_req, res) => {
      const locations = await getAllLocations();
      res.status(200).json(locations);
    }),
  );
};
