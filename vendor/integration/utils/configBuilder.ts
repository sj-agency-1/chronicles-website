import merge from 'lodash.merge';

import type { MetaData } from '~/types';

export type Config = {
  site?: SiteConfig;
  socials?: SocialsConfig;
  contact?: ContactConfig;
  donation?: DonationConfig;
  formsUrls?: FormsUrlsConfig;
  metadata?: MetaDataConfig;
  i18n?: I18NConfig;
  apps?: {
    blog?: AppBlogConfig;
    project?: AppProjectConfig;
  };
  ui?: unknown;
  analytics?: unknown;
};

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}

export interface SocialsConfig {
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  vk?: string;
  ok?: string;
  facebook?: string;
  x?: string;
  instagram?: string;
}

export interface ContactConfig {
  email?: string;
  telegram?: string;
  whatsapp?: string;
}

export interface DonationConfig {
  usdtTrc20Address?: string;
  usdtErc20Address?: string;
  usdcSolAddress?: string;

  cryptoPaymentLink?: string;
  bankCardPaymentLink?: string;
}

export interface FormsUrlsConfig {
  consultationFormTestUrl?: string;
  consultationFormUrl?: string;
  vacancyFormTestUrl?: string;
  vacancyFormUrl?: string;
}

export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}

export interface I18NConfig {
  language: string;
  textDirection: string;
  dateFormatter?: Intl.DateTimeFormat;
}
export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  isRelatedPostsEnabled: boolean;
  relatedPostsCount: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AppProjectConfig {
  isEnabled: boolean;
  projectsPerPage: number;
  isRelatedProjectsEnabled: boolean;
  relatedProjectsCount: number;
  project: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
    };
    yandexMetrica?: {
      id?: string;
    };
  };
}

export interface UIConfig {
  theme: string;
}

const DEFAULT_SITE_NAME = 'Website';

const getSite = (config: Config) => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,

    googleSiteVerificationId: '',
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getSocials = (config: Config) => {
  const _default = {
    tiktok: '',
    youtube: '',
    linkedin: '',
    vk: '',
    ok: '',
    facebook: '',
    x: '',
    instagram: '',
  };

  return merge({}, _default, config?.socials ?? {}) as SocialsConfig;
};

const getContact = (config: Config) => {
  const _default = {
    email: '',
    telegram: '',
    whatsapp: '',
  };

  return merge({}, _default, config?.contact ?? {}) as ContactConfig;
};

const getDonation = (config: Config) => {
  const _default = {
    usdtTrc20Address: '',
    usdtErc20Address: '',
    usdcSolAddress: '',

    cryptoPaymentLink: '',
    bankCardPaymentLink: '',
  };

  return merge({}, _default, config?.donation ?? {}) as DonationConfig;
};

const getFormsUrls = (config: Config) => {
  const _default = {
    consultationFormUrl: '',
    consultationFormTestUrl: '',
    vacancyFormUrl: '',
    vacancyFormTestUrl: '',
  };

  return merge({}, _default, config?.formsUrls ?? {}) as FormsUrlsConfig;
};

const getMetadata = (config: Config) => {
  const siteConfig = getSite(config);

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig;
};

const getI18N = (config: Config) => {
  const _default = {
    language: 'en',
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return value as I18NConfig;
};

const getAppBlog = (config: Config) => {
  const _default = {
    isEnabled: false,
    postsPerPage: 6,
    isRelatedPostsEnabled: false,
    relatedPostsCount: 4,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  return merge({}, _default, config?.apps?.blog ?? {}) as AppBlogConfig;
};

const getAppProject = (config: Config) => {
  const _default = {
    isEnabled: false,
    projectsPerPage: 6,
    isRelatedProjectsEnabled: false,
    relatedProjectsCount: 4,
    project: {
      isEnabled: true,
      permalink: '/project/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'project',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  return merge({}, _default, config?.apps?.project ?? {}) as AppProjectConfig;
};

const getUI = (config: Config) => {
  const _default = {
    theme: 'system',
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = (config: Config) => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

export default (config: Config) => ({
  SITE: getSite(config),
  SOCIALS: getSocials(config),
  CONTACT: getContact(config),
  DONATION: getDonation(config),
  FORMS_URLS: getFormsUrls(config),
  I18N: getI18N(config),
  METADATA: getMetadata(config),
  APP_BLOG: getAppBlog(config),
  APP_PROJECT: getAppProject(config),
  UI: getUI(config),
  ANALYTICS: getAnalytics(config),
});
