import type { Post } from '~/types';

export enum SkillType {
  CrisisManagement = 'crisis-response',
  BusinessAnalysis = 'strategic-analytics',
  BusinessDevelopment = 'market-expansion',
  SalesManagement = 'sales-forces-optimization',
  MarketingAndAdv = 'adv-and-marketing',
  InternetMarketing = 'digital-performance',
  BusinessCommunicationAndMediation = 'deal-negotiation-and-mediation',
  FindInvestments = 'funding-and-investor-relations',
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
