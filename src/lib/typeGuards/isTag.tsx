import { Tag } from '@mytypes/types';

export function isTag(obj: any): obj is Tag {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const hasValidId = typeof obj.id === 'number';
    const hasValidLabel = typeof obj.label === 'string';
    const hasValidProjectsTagged = typeof obj.projectsTagged === 'number';
    const hasValidUsersTagged = typeof obj.usersTagged === 'number';
    const hasValidTotalTagged = typeof obj.totalTagged === 'number';

    return hasValidId && hasValidLabel && hasValidProjectsTagged && hasValidUsersTagged && hasValidTotalTagged;
}
