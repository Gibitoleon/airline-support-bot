
import FormData from "form-data";
import db from "../models/index.js";
import NotFoundError from "../errors/NotFounderror.js";
import BadRequestError from "../errors/BadRequesterror.js";

import { apiRequest } from "../utils/apiRequest.js";

const {
    Document
} = db;

export default class DocumentService {

    static async getAllDocuments() {
        return await Document.findAll({
            order: [["created_at", "DESC"]]
        });
    }


    static async getDocumentById(documentId) {

        const document = await Document.findOne({
            where: {
                document_id: documentId
            }
        });

        if (!document) {
            throw new NotFoundError("Document not found");
        }

        return document;
    }


    static async getDocumentContent(documentId) {

        const document =
            await this.getDocumentById(documentId);

        const response = await apiRequest({
            url: `/documents/${documentId}/content`,
            method: "POST",
            data : {
                domain: document.domain,
                filename: document.file_name
            },

            baseURL: process.env.RAG_SERVICE_URL
        });

        return {
            document,
            content: response.content
        };
    }


    static async uploadDocument({
    file,
    documentData
}) {

    if (!file) {
        throw new BadRequestError(
            "Document file is required"
        );
    }

    const {
        document_id,
        title,
        origin,
        domain,
        category,
        document_type,
        access,
        status,
        language
    } = documentData;

    const applicable_to =  JSON.parse(documentData.applicable_to);
    const existingDocument =
        await Document.findOne({
            where: {
                document_id
            }
        });

    if (existingDocument) {
        throw new BadRequestError(
            "Document already exists"
        );
    }


    const formData = new FormData();


    formData.append(
        "file",
        file.buffer,
        {
            filename: file.originalname,
            contentType: file.mimetype
        }
    );


    formData.append(
        "document_id",
        document_id
    );

    formData.append(
        "title",
        title
    );

    formData.append(
        "origin",
        origin
    );

    formData.append(
        "domain",
        domain
    );

    formData.append(
        "category",
        category
    );

    formData.append(
        "document_type",
        document_type
    );

    formData.append(
        "applicable_to",
        JSON.stringify(applicable_to)
    );

    formData.append(
        "access",
        access
    );

    formData.append(
        "status",
        status
    );

    formData.append(
        "language",
        language
    );


    try {

        const ragResponse =
            await apiRequest({
                url: "/documents",
                method: "POST",
                baseURL: process.env.RAG_SERVICE_URL,
                data: formData,
                headers: formData.getHeaders()
            });


        const document =
            await Document.create({
                document_id,
                title,
                origin,
                domain,
                category,
                document_type,
                applicable_to,
                access,
                status,
                language,
                file_name: ragResponse.file_name,
                file_path: ragResponse.file_path
            });


        return document;

    } catch (error) {
        throw new BadRequestError(
            "Unable to upload document"
        );
    }
}


    static async updateDocument(
        documentId,
        updates
    ) {

        const document =
            await this.getDocumentById(documentId);

        return await document.update({
            ...updates
        });
    }


    static async replaceDocumentFile(
        documentId,
        file
    ) {

        if (!file) {
            throw new BadRequestError(
                "Document file is required"
            );
        }


        const document =
            await this.getDocumentById(documentId);


        const formData = new FormData();

        formData.append(
            "file",
            file.buffer,
            {
                filename: file.originalname,
                contentType: file.mimetype
            }
        );


        try {

            const response = await apiRequest({
                url: `/documents/${documentId}`,
                method: "PUT",
                baseURL: process.env.RAG_SERVICE_URL,
                data: formData,
                headers: formData.getHeaders()
            });


            return await document.update({
                file_name: response.file_name,
                file_path: response.file_path
            });

        } catch (error) {

            throw new BadRequestError(
                "Unable to replace document file"
            );
        }
    }


    static async deleteDocument(documentId) {

        const document =
            await this.getDocumentById(documentId);


        try {

            await apiRequest({
                url: `/documents/${documentId}`,
                method: "DELETE",
                baseURL: process.env.RAG_SERVICE_URL
            });


            await document.destroy();

            return {
                message: "Document deleted successfully"
            };

        } catch (error) {

            throw new BadRequestError(
                "Unable to delete document"
            );
        }
    }
}

