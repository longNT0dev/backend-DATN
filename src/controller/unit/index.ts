import { Request, Response } from "express";
import { responseApi } from "../../common";
import { AuthRequest } from "../../common/AuthRequest";
import courceRepositories from "../../repositories/course";
import courseService from "../../service/course";

const unitController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
      const idCourse = req.params.id;
      const idUser = req.authUser.id;
      const unitInfo = req.body;

      const course = await courceRepositories.getDrawCourse(idCourse);
      if (!course) {
        throw new Error("Course not found");
      }
      if (idUser != course.author) {
        throw new Error("Permission denied");
      }

      const result = await courseService.createUnit(idCourse, idUser, unitInfo);

      responseApi(res, 200, {
        success: true,
        response: {
          message: "Create Unit success!",
          data: result,
        },
      });
    } catch (error) {
      responseApi(res, 500, {
        success: false,
        response: {
          message: error.message,
        },
      });
    }
  },
};
export default unitController;
