export type LanguageRuleId = "sentence-length" | "paragraph-lines" | "unexplained-jargon" | "active-voice" | "direct-address" | "information-hierarchy";
export type LanguageSeverity = "guidance" | "review";
export type LanguageStatus = "aprovado" | "revisao-necessaria" | "falha" | "inconclusivo" | "nao-analisado" | "nao-aplicavel";
export type LanguageOccurrence = { id: string; ruleId: LanguageRuleId; severity: LanguageSeverity; targetId: string; fieldPath: string; excerpt?: string; message: string; textRevision: number; ruleVersion: string };
export type LanguageReview = { status: LanguageStatus; occurrences: LanguageOccurrence[]; analyzedTargets: number; message: string };
