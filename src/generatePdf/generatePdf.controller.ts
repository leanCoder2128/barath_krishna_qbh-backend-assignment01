import { Controller, Get, Res } from "@nestjs/common";
import { GeneratePdfService } from "./generatePdf.service";
import { Response } from "express";

@Controller('pdf')
export class GeneratePdfController{

    constructor(private generatePDFSvc : GeneratePdfService){}

    @Get()
    async getPdf(@Res() res: Response): Promise<void> {
      const pdfBuffer = await this.generatePDFSvc.generatePdf();
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=user-list.pdf',
        'Content-Length': pdfBuffer.length
      });
      res.end(pdfBuffer);
    }

    @Get('view')
    async viewAsPdf(@Res() res: Response): Promise<void> {
      const pdfDoc = await this.generatePDFSvc.viewAsPdf();
     pdfDoc.pipe(res);
     pdfDoc.end();
    }
  
}