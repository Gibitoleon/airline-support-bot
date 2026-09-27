import DocumentService from "../services/DocumentService.js";
import { StatusCodes } from "http-status-codes";

const getAllDocuments = async (req, res) => {

    const documents =
        await DocumentService.getAllDocuments();

    return res.status(StatusCodes.OK).json({
        documents
    });
};

const uploadDocument = async (req, res) => {

    const document =
        await DocumentService.uploadDocument({
            file: req.file,
            documentData: req.body
        });

    return res.status(StatusCodes.CREATED).json({
        message: "Document uploaded successfully",
        document
    });
};


export {
    getAllDocuments,uploadDocument
};
