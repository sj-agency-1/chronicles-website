import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Project } from '~/types';
import { APP_PROJECT } from 'astrowind:config';
import { cleanSlug, trimSlash, PROJECT_BASE, PROJECT_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = PROJECT_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedProject = async (project: CollectionEntry<'project'>): Promise<Project> => {
  const { id, data } = project;
  const { Content, remarkPluginFrontmatter } = await render(project);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    // author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    // author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Project>> {
  const projects = await getCollection('project');
  const normalizedProjects = projects.map(async (project) => await getNormalizedProject(project));

  const results = (await Promise.all(normalizedProjects))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((project) => !project.draft);

  return results;
};

let _projects: Array<Project>;

/** */
export const isBlogEnabled = APP_PROJECT.isEnabled;
export const isRelatedProjectsEnabled = APP_PROJECT.isRelatedProjectsEnabled;
export const isBlogListRouteEnabled = APP_PROJECT.list.isEnabled;
export const isBlogProjectRouteEnabled = APP_PROJECT.project.isEnabled;
export const isBlogCategoryRouteEnabled = APP_PROJECT.category.isEnabled;
export const isBlogTagRouteEnabled = APP_PROJECT.tag.isEnabled;

export const blogListRobots = APP_PROJECT.list.robots;
export const blogProjectRobots = APP_PROJECT.project.robots;
export const blogCategoryRobots = APP_PROJECT.category.robots;
export const blogTagRobots = APP_PROJECT.tag.robots;

export const blogProjectsPerPage = APP_PROJECT?.projectsPerPage;

/** */
export const fetchProjects = async (): Promise<Array<Project>> => {
  if (!_projects) {
    _projects = await load();
  }

  return _projects;
};

/** */
export const findProjectsBySlugs = async (slugs: Array<string>): Promise<Array<Project>> => {
  if (!Array.isArray(slugs)) return [];

  const projects = await fetchProjects();

  return slugs.reduce(function (r: Array<Project>, slug: string) {
    projects.some(function (project: Project) {
      return slug === project.slug && r.push(project);
    });
    return r;
  }, []);
};

/** */
export const findProjectsByIds = async (ids: Array<string>): Promise<Array<Project>> => {
  if (!Array.isArray(ids)) return [];

  const projects = await fetchProjects();

  return ids.reduce(function (r: Array<Project>, id: string) {
    projects.some(function (project: Project) {
      return id === project.id && r.push(project);
    });
    return r;
  }, []);
};

/** */
export const findLatestProjects = async ({ count }: { count?: number }): Promise<Array<Project>> => {
  const _count = count || 4;
  const projects = await fetchProjects();

  return projects ? projects.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchProjects(), {
    params: { project: PROJECT_BASE || undefined },
    pageSize: blogProjectsPerPage,
  });
};

/** */
export const getStaticPathsBlogProject = async () => {
  if (!isBlogEnabled || !isBlogProjectRouteEnabled) return [];
  return (await fetchProjects()).flatMap((project) => ({
    params: {
      project: project.permalink,
    },
    props: { project: project },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const projects = await fetchProjects();
  const categories = {};
  projects.map((project) => {
    if (project.category?.slug) {
      categories[project.category?.slug] = project.category;
    }
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      projects.filter((project) => project.category?.slug && categorySlug === project.category?.slug),
      {
        params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
        pageSize: blogProjectsPerPage,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const projects = await fetchProjects();
  const tags = {};
  projects.map((project) => {
    if (Array.isArray(project.tags)) {
      project.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      projects.filter((project) => Array.isArray(project.tags) && project.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: blogProjectsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export async function getRelatedProjects(originalProject: Project, maxResults: number = 4): Promise<Project[]> {
  const allProjects = await fetchProjects();
  const originalTagsSet = new Set(originalProject.tags ? originalProject.tags.map((tag) => tag.slug) : []);

  const projectsWithScores = allProjects.reduce(
    (acc: { project: Project; score: number }[], iteratedProject: Project) => {
      if (iteratedProject.slug === originalProject.slug) return acc;

      let score = 0;
      if (
        iteratedProject.category &&
        originalProject.category &&
        iteratedProject.category.slug === originalProject.category.slug
      ) {
        score += 5;
      }

      if (iteratedProject.tags) {
        iteratedProject.tags.forEach((tag) => {
          if (originalTagsSet.has(tag.slug)) {
            score += 1;
          }
        });
      }

      acc.push({ project: iteratedProject, score });
      return acc;
    },
    []
  );

  projectsWithScores.sort((a, b) => b.score - a.score);

  const selectedProjects: Project[] = [];
  let i = 0;
  while (selectedProjects.length < maxResults && i < projectsWithScores.length) {
    selectedProjects.push(projectsWithScores[i].project);
    i++;
  }

  return selectedProjects;
}
