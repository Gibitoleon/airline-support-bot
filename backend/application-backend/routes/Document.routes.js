import express from "express";
import multer from "multer"

import {
    getAllDocuments,uploadDocument,getDocumentContent,deleteDocument
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

router.get(
    "/getdocumentcontent/:documentId",
    getDocumentContent
);
router.delete(
    "/deletedocument/:documentId",
    deleteDocument
);
export default router;
