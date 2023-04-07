import { Project } from '@mytypes/types';
import { isUser } from '@typeGuards/isUser';
import { isTag } from '@typeGuards/isTag';

export const isProject = (obj: any, omitAuthor: boolean = false): obj is Project => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // Check primitive types
    const hasValidId = typeof obj.id === 'number';
    const hasValidTitle = typeof obj.title === 'string';
    const hasValidDescription = typeof obj.description === 'string';
    const hasValidShortDescription = typeof obj.shortDescription === 'string';

    // Check if arrays contain valid tags
    const hasValidTags = Array.isArray(obj.tags) && obj.tags.every((tag: any) => isTag(tag));

    // Check if author is a valid user
    const hasValidAuthor = omitAuthor ? true : isUser(obj.author, true);

    return (
        hasValidId && hasValidTitle && hasValidDescription && hasValidShortDescription && hasValidTags && hasValidAuthor
    );
};
