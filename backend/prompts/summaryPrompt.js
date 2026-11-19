/**
 * Summary & Slide-by-Slide Synthesis Prompt
 * Consolidates individual judge views into slide-by-slide feedback and overall deck synthesis.
 */
export const buildSummaryPrompt = ({ projectName, projectDescription, audience, slides, judgeReports }) => {
  const slidesContent = slides
    .map(s => `[Slide ${s.slideNumber}]: ${s.text}`)
    .join('\n\n');

  const judgesHighlights = judgeReports.map(j => `
--- Judge: ${j.name} (${j.judgeId}) ---
Score: ${j.score}/100
Verdict: ${j.verdict}
Top Weaknesses: ${JSON.stringify(j.weaknesses || [])}
  `).join('\n');

  return `You are the Head Judge and Executive Synthesis Engine for Slide Roast.
You have reviewed a pitch deck for "${projectName}" (Audience: "${audience}").
Three AI judges (Investor, Professor, Customer) have already reviewed the deck.

Extracted Slides:
${slidesContent}

Judge Findings:
${judgesHighlights}

Your tasks:
1. Provide an executive summary covering:
   - What the deck does well
   - The single biggest fatal weakness
   - Clarity evaluation
   - The most important next action
2. Consolidate the top 3 highest-priority improvements across the entire presentation.
3. Generate detailed slide-by-slide feedback for every single slide (1 to ${slides.length}).

Respond ONLY with valid JSON matching this schema:
{
  "overallSummary": {
    "strengths": "<What the deck does well in 2-3 sentences>",
    "biggestWeakness": "<The single biggest flaw holding back this pitch in 2-3 sentences>",
    "clarityEvaluation": "<How clearly and cleanly it communicates the core idea in 1-2 sentences>",
    "nextAction": "<The exact priority task the founder must tackle next>"
  },
  "topImprovements": [
    {
      "slideNumber": <integer slide number>,
      "problem": "<specific critical problem>",
      "evidence": "<evidence from slide>",
      "whyItMatters": "<why this will cause judges or investors to pass>",
      "suggestedAction": "<concrete fix>",
      "severity": "<critical | high | medium>"
    }
  ],
  "slideFeedback": [
    {
      "slideNumber": <integer slide number>,
      "title": "<inferred slide title, e.g. Executive Summary / Problem Statement / Business Model>",
      "summary": "<1 sentence summary of what this slide covers>",
      "strengths": [
        "<what works on this slide>"
      ],
      "weaknesses": [
        {
          "issue": "<core issue with this slide>",
          "evidence": "<reference to slide content>",
          "severity": "<critical | high | medium | low>",
          "suggestion": "<actionable fix>"
        }
      ]
    }
  ]
}`;
};
