import type { Post } from '~/types';

export enum SkillType {
  CrisisManagement = 'crisis-management',
  BusinessAnalysis = 'business-analytics',
  BusinessDevelopment = 'grow-business',
  SalesManagement = 'sales-forces',
  MarketingAndAdv = 'marketing-advertising',
  InternetMarketing = 'digital-marketing',
  BusinessCommunicationAndMediation = 'business-negotiations-mediation',
  FindInvestments = 'merger-acquisition',
}

export interface Skill extends Post {
  type: SkillType;
}

export const getSkillTitle = (skill: SkillType): string => {
  switch (skill) {
    case SkillType.CrisisManagement:
      return 'Кризис-менеджмент';
    case SkillType.BusinessAnalysis:
      return 'Бизнес-аналитика';
    case SkillType.BusinessDevelopment:
      return 'Развитие бизнеса';
    case SkillType.SalesManagement:
      return 'Управление продажами';
    case SkillType.MarketingAndAdv:
      return 'Маркетинг и реклама';
    case SkillType.InternetMarketing:
      return 'Интернет-маркетинг';
    case SkillType.BusinessCommunicationAndMediation:
      return 'Бизнес-переговоры. Медиация';
    case SkillType.FindInvestments:
      return 'Привлечение инвестиций';
  }
};

export const getSkillLink = (skill: SkillType): string => `/skills/${skill}`;
