import express, { type NextFunction, type Response, type Request } from "express";
import multer from "multer";
import { renameSync } from "fs";

export const fileUploadRouter = express.Router();

const upload = multer({ dest: "public" });

fileUploadRouter.post("/", upload.single("file"), (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  try {
    const originalname = req.file?.originalname as string;
    const path = req.file?.path as string;

    const newPath = path + "_" + originalname;

    console.log("Path generado por multer: " + path);
    console.log("Nuevo path: " + newPath);

    renameSync(path, newPath);

    res.send("Fichero subido correctamente!");
    console.log("Fichero subido correctamente!");
  } catch (error) {
    next(error);
  }
});
