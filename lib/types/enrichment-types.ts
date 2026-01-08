export type ResearchPrompt = {
  criterion_id: string;
  prompt_text: string;
  weight: number;
};

export type EditPromptsPayload = {
  account_scoring_prompt_text: string;
  profile_scoring_prompt_text: string;
  research_prompts: ResearchPrompt[];
};
