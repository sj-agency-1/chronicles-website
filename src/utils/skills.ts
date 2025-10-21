import type { Post } from '~/types';

export enum SkillType {
  CrisisManagement = 'crisis-management',
  BusinessAnalysis = 'business-analysis',
  BusinessDevelopment = 'business-development',
  SalesManagement = 'sales-management',
  MarketingAndAdv = 'marketing-and-adv',
  InternetMarketing = 'internet-marketing',
  BusinessCommunicationAndMediation = 'business-communication-and-mediation',
  FindInvestments = 'find-investments',
}

export interface Skill extends Post {
  type: SkillType;
}
