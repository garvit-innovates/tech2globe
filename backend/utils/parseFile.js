const mammoth = require("mammoth");
const pdfParse = require("pdf-parse");
const path = require("path");

async function parseFile(file) {
  const extension = path.extname(file.originalname || "").toLowerCase();

  if (extension === ".pdf") {
    const parsedPdf = await pdfParse(file.buffer);
    return parsedPdf.text.replace(/\s+/g, " ").trim();
  }

  if (extension === ".docx") {
    const parsedDoc = await mammoth.extractRawText({ buffer: file.buffer });
    return parsedDoc.value.replace(/\s+/g, " ").trim();
  }

  const error = new Error("Unsupported file type. Please upload PDF or DOCX.");
  error.statusCode = 400;
  throw error;
}

module.exports = parseFile;
