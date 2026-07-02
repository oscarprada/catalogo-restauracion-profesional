import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.resolve("uploads/species");

fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({

  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {

    const extension = path.extname(file.originalname);

    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000) +
      extension;

    cb(null, filename);

  }

});

const upload = multer({
  storage
});

export default upload;

