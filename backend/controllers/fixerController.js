import { improveSlide } from '../services/fixerService.js';
import { fixerRequestSchema } from '../utils/validators.js';

/**
 * Controller to fix a specific slide
 */
export const fixSlide = async (req, res, next) => {
  try {
    const validated = fixerRequestSchema.parse(req.body);
    const result = await improveSlide(validated);

    res.json({
      success: true,
      message: `Slide ${validated.slideNumber} successfully revamped.`,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  fixSlide,
};
