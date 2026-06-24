import { AnalysisService } from './analysis.service';

describe('AnalysisService', () => {
  it('should report ready status', () => {
    expect(new AnalysisService().getStatus()).toEqual({
      feature: 'analysis',
      status: 'ready',
    });
  });
});
