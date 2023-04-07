import styles from './Heading.module.scss';

type HeadingProps = {
    children: React.ReactNode;
    className?: string;
    semanticLevel: 1 | 2 | 3 | 4 | 5 | 6;
    styledLevel: 1 | 2 | 3 | 4 | 5 | 6;
    orange?: boolean;
};

export const Heading = (props: HeadingProps) => {
    const { children, className = '', semanticLevel, styledLevel, orange = false } = props;

    const HeadingTag = `h${semanticLevel}` as keyof JSX.IntrinsicElements;

    return (
        <HeadingTag
            className={`${className} ${orange ? styles['orange'] : ''} ${styles['heading']} ${
                styles[`heading-${styledLevel}`]
            }`}
        >
            {children}
        </HeadingTag>
    );
};
