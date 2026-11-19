import AnalysisModel from '../models/Analysis.js';

/**
 * Get all saved roast reports
 */
export const getHistory = async (req, res, next) => {
  try {
    const list = await AnalysisModel.find({});
    // Return sanitized summary for history table
    const reports = list.map(item => ({
      id: item._id || item.id,
      projectName: item.projectName,
      audience: item.audience,
      filename: item.filename,
      pageCount: item.pageCount,
      overallScore: item.overallScore,
      scoreInterpretation: item.scoreInterpretation,
      categoryScores: item.categoryScores,
      status: item.status,
      createdAt: item.createdAt,
    }));

    res.json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a report from history
 */
export const deleteAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await AnalysisModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Report not found or already deleted.'
      });
    }

    res.json({
      success: true,
      message: 'Roast report deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getHistory,
  deleteAnalysis,
};
