import type { AccessibilityReport } from '../../types/accessibility';
import { ImageAnalysisService } from '../azure/imageAnalysis';
import { DocumentAnalysisService } from '../azure/documentAnalysis';
import { createWebpageReport, createDocumentReport } from './utils/report';
import { AuditError } from './errors/AuditError';

export class AccessibilityAuditService {
  constructor(
    private imageAnalysis = new ImageAnalysisService(),
    private documentAnalysis = new DocumentAnalysisService()
  ) {}

  async auditWebpage(url: string): Promise<AccessibilityReport> {
    try {
      const analysis = await this.imageAnalysis.analyzeWebPage(url);
      return createWebpageReport(url, analysis);
    } catch (error) {
      throw new AuditError('webpage', error);
    }
  }

  async auditDocument(url: string, type: 'pdf' | 'word'): Promise<AccessibilityReport> {
    try {
      const analysis = await this.documentAnalysis.analyzePDF(url);
      const imageAnalysis = await this.processDocumentImages(analysis);
      return createDocumentReport(url, type, imageAnalysis);
    } catch (error) {
      throw new AuditError('document', error);
    }
  }

  private async processDocumentImages(analysis: any) {
    // TODO: Implementar procesamiento de imágenes del documento
    return [];
  }
}