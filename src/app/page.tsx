import { AccordionsList } from '@components/AccordionsList/AccordionsList';
import { Heading } from '@components/Heading/Heading';

export default function Home() {
    return (
        <main>
            <Heading semanticLevel={2} styledLevel={3}>
                Single expand
            </Heading>
            <AccordionsList
                items={[
                    { label: 'Test 1', children: <div>lalala test</div> },
                    { label: 'Test 2', children: <div>lululu test</div> },
                ]}
            />

            <div style={{ padding: '50px' }}></div>

            <Heading semanticLevel={2} styledLevel={3}>
                Multi expand
            </Heading>
            <AccordionsList
                multiExpand
                items={[
                    { label: 'Test 1', children: <div>lalala test</div> },
                    { label: 'Test 2', children: <div>lululu test</div> },
                ]}
            />
        </main>
    );
}
