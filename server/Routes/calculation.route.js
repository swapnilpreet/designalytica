const router = require("express").Router();
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

let workbook = new ExcelJS.Workbook();

router.post("/calculation", async (req, res) => {
  try {
    const { number1, number2 } = req.body;
    if (!number1 && !number2) {
      res.send({
        success: false,
        message: "Fill input filled with value",
      });
    } else {
      const result = parseInt(number1) + parseInt(number2);
      const worksheet = workbook.addWorksheet("Designalytica Pvt. Ltd");
      worksheet.addRow(["Number 1", "Number 2", "Result"]);
      worksheet.addRow([number1, number2, result]);
      res.send({
        success: true,
        message: "calculation done",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/download-pdf-file", async (req, res) => {
  try {
    if (workbook.worksheets.length === 0) {
      res.send({
        success: false,
        message: "Please select the value Excel file is Empty",
      });
    }
    
    const pdfDoc = new PDFDocument();
    pdfDoc.text(
        `Label: ${workbook.worksheets[0].getRow(1).getCell(1)} + ${
          workbook.worksheets[0].getRow(1).getCell(2)
        } = ${workbook.worksheets[0].getRow(1).getCell(3)}`
      );
    pdfDoc.text(
      `Result: ${workbook.worksheets[0].getRow(2).getCell(1).value} + ${
        workbook.worksheets[0].getRow(2).getCell(2).value
      } = ${workbook.worksheets[0].getRow(2).getCell(3).value}`
    );

    const buffers = [];
    pdfDoc.on("data", buffers.push.bind(buffers));
    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=result.pdf");
      res.send(pdfBuffer);
    });
    pdfDoc.end();

  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
