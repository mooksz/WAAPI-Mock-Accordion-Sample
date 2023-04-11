'use client';

import { Heading } from '@components/Heading/Heading';
import styles from './Accordion.module.scss';
import { useRef, useState, useEffect, useId } from 'react';

export type AccordionProps = {
    label: React.ReactNode;
    children: React.ReactNode;
    htmlElement?: 'div' | 'li';
    activeAccordion?: string;
    setActiveAccordion?: (index: string) => void;
    multiExpand?: boolean;
    index?: number;
};

export const Accordion = (props: AccordionProps) => {
    const {
        label,
        children,
        htmlElement: HTMLElement = 'div',
        activeAccordion,
        setActiveAccordion,
        multiExpand,
    } = props;
    const detailsRef = useRef<HTMLDetailsElement>();
    const labelRef = useRef<HTMLElement>();
    const contentRef = useRef<HTMLDivElement>();
    const [animation, setAnimation] = useState<Animation | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const [expanded, setIsExpanded] = useState(false);
    const id = useId();

    const toggleAccordion = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
        e.preventDefault();

        // If event type is keydown and key space or enter is pressed
        if (
            e.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLElement>).key !== 'Enter' &&
            (e as React.KeyboardEvent<HTMLElement>).key !== ' '
        )
            return;

        if (!detailsRef.current || !contentRef.current) return;

        if (isClosing || !detailsRef.current.open) {
            if (setActiveAccordion && activeAccordion !== id) {
                setActiveAccordion(id);
            }

            window.requestAnimationFrame(() => expand());
            return;
        }

        if (isExpanding || detailsRef.current.open) {
            window.requestAnimationFrame(() => shrink());
            return;
        }
    };

    const shrink = (log?: string) => {
        if (!detailsRef.current || !labelRef.current || !contentRef.current) return;

        // Set the element as "being closing"
        setIsClosing(true);

        // Add an overflow hidden to avoid content overflowing
        detailsRef.current.style.overflow = 'hidden';

        // Store the current height of the element
        const startHeight = `${detailsRef.current.offsetHeight}px`;

        // Calculate the height of the summary
        const endHeight = `${detailsRef.current.offsetHeight - contentRef.current.offsetHeight}px`;

        // If there is already an animation running
        if (animation) {
            // Cancel the current animation
            animation.cancel();
        }

        // Start a WAAPI animation
        const currentAnimation = detailsRef.current.animate(
            {
                // Set the keyframes from the startHeight to endHeight
                height: [startHeight, endHeight],
            },
            {
                id: 'shrink',
                duration: 400,
                easing: 'ease-out',
            },
        );

        // Set animation state
        setAnimation(currentAnimation);

        // When the animation is complete, call onAnimationFinish()
        currentAnimation.onfinish = () => onAnimationFinish(false);

        // If the animation is cancelled, isClosing variable is set to false
        currentAnimation.oncancel = () => setIsClosing(false);
    };

    const expand = () => {
        if (!detailsRef.current || !labelRef.current || !contentRef.current) return;

        detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`;

        // Set the element as "being expanding"
        setIsExpanding(true);

        // Add an overflow hidden to avoid content overflowing
        detailsRef.current.style.overflow = 'hidden';

        // Get the current fixed height of the element
        const startHeight = `${detailsRef.current.offsetHeight}px`;

        // Calculate the open height of the element (detail height + content height)
        const endHeight = `${detailsRef.current.offsetHeight + contentRef.current.offsetHeight}px`;

        // If there is already an animation running
        if (animation) {
            // Cancel the current animation
            animation.cancel();
        }

        // Start a WAAPI animation
        const currentAnimation = detailsRef.current.animate(
            {
                // Set the keyframes from the startHeight to endHeight
                height: [startHeight, endHeight],
            },
            {
                id: 'grow',
                duration: 400,
                easing: 'ease-out',
            },
        );

        // Set animation state
        setAnimation(currentAnimation);

        // When the animation is complete, call onAnimationFinish()
        currentAnimation.onfinish = () => onAnimationFinish(true);

        // If the animation is cancelled, isExpanding variable is set to false
        currentAnimation.oncancel = () => setIsExpanding(false);
    };

    const onAnimationFinish = (open: boolean) => {
        if (!detailsRef.current || !labelRef.current || !contentRef.current) return;

        // Set the open attribute based on the parameter
        detailsRef.current.open = open;
        setIsExpanded(open);

        // Clear the stored animation
        setAnimation(null);

        // Reset isClosing & isExpanding
        setIsClosing(false);
        setIsExpanding(false);

        // Remove the overflow hidden and the fixed height
        detailsRef.current.style.height = detailsRef.current.style.overflow = '';
    };

    // If the activeAccordion prop is set and this accordion is not the active accordion
    // and the accordion is not set to multiExpand, shrink the accordion
    useEffect(() => {
        if (activeAccordion && id !== activeAccordion && !multiExpand && detailsRef.current?.open) {
            shrink();
        }
    }, [activeAccordion, multiExpand]);

    return (
        <HTMLElement
            className={`${styles['accordion-wrapper']}`}
            onClick={toggleAccordion}
            onKeyDown={toggleAccordion}
            aria-controls={id}
            aria-expanded={expanded}
            role="button"
            tabIndex={0}
        >
            <details ref={detailsRef as React.LegacyRef<HTMLDetailsElement>} className={`${styles['accordion']}`}>
                <summary
                    tabIndex={-1}
                    role="decoration"
                    ref={labelRef as React.LegacyRef<HTMLElement>}
                    className={`${styles['label']}`}
                >
                    <Heading className={`${styles['heading']}`} semanticLevel={4} styledLevel={6}>
                        {label}
                    </Heading>
                </summary>

                <div id={id} ref={contentRef as React.LegacyRef<HTMLDivElement>} className={`${styles['content']}`}>
                    {children}
                </div>
            </details>
        </HTMLElement>
    );
};
