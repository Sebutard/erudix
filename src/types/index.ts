export interface UserPreferences { historicalPeriods:string[]; civilizations:string[]; personalities:string[]; regions:string[]; countries:string[]; preferredSessionDuration:number; }
export type ResourceType='youtube'|'article'|'podcast'|'educational';
export interface LearningResource { id:string; type:ResourceType; title:string; source:string; url:string; thumbnail?:string; estimatedDuration:number; description?:string; }
export interface LearningSession { id:string; title:string; topic:string; description:string; estimatedDuration:number; resources:LearningResource[]; createdAt:string; }
