import { User } from '@mytypes/types';
import { isProject } from '@typeGuards/isProject';
import { isTag } from '@typeGuards/isTag';

export const isUser = (obj: any, omitProjects: boolean = false): obj is User => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // Check primitive types
    const hasValidId = typeof obj.id === 'number';
    const hasValidName = typeof obj.name === 'string';
    const hasValidQuote = typeof obj.quote === 'string';
    const hasValidDescription = typeof obj.description === 'string';

    // Check if arrays contain valid tags
    const hasValidTags = Array.isArray(obj.tags) && obj.tags.every((tag: any) => isTag(tag));

    // Check if projects are valid projects
    const hasValidProjects = omitProjects
        ? true
        : Array.isArray(obj.projects) && obj.projects.every((project: any) => isProject(project, true));

    return hasValidId && hasValidName && hasValidProjects && hasValidQuote && hasValidDescription && hasValidTags;
};
