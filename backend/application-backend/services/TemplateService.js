import path from "path";
import ejs from "ejs";

export default class TemplateService {

    /**
     * Renders an EJS template into HTML.
     *
     * The template is responsible for defining the structure
     * of the email, while the data provides the dynamic values
     * that will be inserted into the template.
     *
     * @param {string} templateName - Name of the EJS template
     * @param {object} data - Dynamic data passed to the template
     * @returns {Promise<string>} Rendered HTML content
     */
    static async render(templateName, data) {

        // process.cwd() gives us the root directory from which
        // the Node.js application is running.
        const templatePath = path.join(
            process.cwd(),
            "templates",
            `${templateName}.ejs`
        );

        // EJS loads the template and replaces its placeholders
        // with the values provided in the data object.
        return await ejs.renderFile(templatePath, { data });
    }
}

