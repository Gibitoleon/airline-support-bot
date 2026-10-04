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

const getDocumentContent = async (req, res) => {

    const documentId = req.params.documentId;
    const { document, content } = await DocumentService.getDocumentContent(documentId);

    return res.status(StatusCodes.OK).json({
        document,
        content
    });
};

const deleteDocument = async (req, res) => {

    const documentId = req.params.documentId;
    const response = await DocumentService.deleteDocument(documentId);
    return res.status(StatusCodes.OK).json({
        message: response.message
    });

}
export {
    getAllDocuments,uploadDocument,getDocumentContent,deleteDocument
};
