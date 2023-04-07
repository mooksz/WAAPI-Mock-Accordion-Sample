'use client';

import styles from './AccordionsList.module.scss';
import { Accordion, AccordionProps } from '@components/Accordion/Accordion';
import { useState } from 'react';

type AccordionsListProps = {
    items: AccordionProps[];
    multiExpand?: boolean;
};

export const AccordionsList = (props: AccordionsListProps) => {
    const { items, multiExpand = false } = props;
    const [activeAccordion, setActiveAccordion] = useState<string>();

    return (
        <ul className={`${styles['accordions-list']}`}>
            {items.map((item, index) => (
                <Accordion
                    setActiveAccordion={setActiveAccordion}
                    activeAccordion={activeAccordion}
                    multiExpand={multiExpand}
                    key={item.label?.toString()}
                    label={item.label}
                    htmlElement="li"
                    index={index}
                >
                    {item.children}
                </Accordion>
            ))}
        </ul>
    );
};
