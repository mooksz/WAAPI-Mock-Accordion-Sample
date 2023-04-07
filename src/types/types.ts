export interface Project {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    tags: Tag[];
    author: Omit<User, 'projects'>;
}

export interface Tag {
    id: number;
    label: string;
    projectsTagged: number;
    usersTagged: number;
    totalTagged: number;
}

export interface User {
    id: number;
    name: string;
    projects: Omit<Project, 'author'>[];
    tags: Tag[];
    quote: string;
    description: string;
}

export type GridSections =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;

export type GridElements =
    | 'abbr'
    | 'address'
    | 'article'
    | 'aside'
    | 'b'
    | 'blockquote'
    | 'caption'
    | 'cite'
    | 'code'
    | 'col'
    | 'colgroup'
    | 'dd'
    | 'del'
    | 'details'
    | 'dfn'
    | 'dialog'
    | 'div'
    | 'dl'
    | 'dt'
    | 'em'
    | 'fieldset'
    | 'figcaption'
    | 'figure'
    | 'footer'
    | 'form'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'header'
    | 'hgroup'
    | 'hr'
    | 'i'
    | 'ins'
    | 'kbd'
    | 'label'
    | 'legend'
    | 'li'
    | 'main'
    | 'mark'
    | 'nav'
    | 'ol'
    | 'output'
    | 'p'
    | 'picture'
    | 'pre'
    | 'q'
    | 's'
    | 'samp'
    | 'section'
    | 'small'
    | 'span'
    | 'strong'
    | 'sub'
    | 'summary'
    | 'sup'
    | 'table'
    | 'tbody'
    | 'td'
    | 'textarea'
    | 'tfoot'
    | 'th'
    | 'thead'
    | 'time'
    | 'tr'
    | 'u'
    | 'ul'
    | 'var';
