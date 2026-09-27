import express from "express";
import multer from "multer"

import {
    getAllDocuments,uploadDocument
} from "../controllers/Document.controller.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.get(
    "/getdocuments",
    getAllDocuments
);

router.post(
    "/uploaddocuments",
    upload.single("file"),
    uploadDocument
);

export default router;
