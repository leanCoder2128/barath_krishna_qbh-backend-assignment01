import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions, TableCell } from 'pdfmake/interfaces';
import { userDetailDto } from 'src/model';
import { UserDetail } from 'src/userDetail/userDetail.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class GeneratePdfService {
  constructor(
    @InjectRepository(UserDetail)
    private userRepository: Repository<UserDetail>,
  ) {}

  async generatePdf(): Promise<Buffer> {
    let UserDetail = await this.findAllUser();

    const fonts = {
        Roboto: {
          normal: 'fonts/Roboto-Regular.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
      };

    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'User List', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            body: this.buildUserTable(UserDetail),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
    };

    const option = {};

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });
  }


  async viewAsPdf(): Promise<PDFKit.PDFDocument> {
    const users = await this.findAllUser();

    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'User List', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            body: this.buildUserTable(users),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
    };

   return printer.createPdfKitDocument(docDefinition);
  }

  private buildUserTable(users: userDetailDto[]): TableCell[][] {
    const body: TableCell[][] = [
      [
        { text: 'ID', style: 'tableHeader' },
        { text: 'Name', style: 'tableHeader' },
        { text: 'Email', style: 'tableHeader' },
        { text: 'Phone Number', style: 'tableHeader' },
        { text: 'Address', style: 'tableHeader' },
      ],
    ];

    users.forEach((user) => {
      const userRow: TableCell[] = [
        user.id || '',
        user.name || '',
        user.email || '',
        user.phoneNumber || '',
        user.address || ''
      ];
      body.push(userRow);
    });

    return body;
  }
  

  async findAllUser(): Promise<userDetailDto[]> {
    return this.userRepository.find();
  }
}
