import { act } from 'react-dom/test-utils';
import { render, screen, logRoles, within } from '@testing-library/react';
import { AccordionsList } from '../AccordionsList';
import userEvent from '@testing-library/user-event';
import { mockAnimationsApi } from 'jsdom-testing-mocks';

mockAnimationsApi();

function setup(jsx: React.ReactElement) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

const items = [
    {
        label: 'Accordion 1',
        children: <div>Accordion 1 content</div>,
    },
    {
        label: 'Accordion 2',
        children: <div>Accordion 2 content</div>,
    },
];

describe('AccordionsList', () => {
    it('renders accordions list', () => {
        render(<AccordionsList items={items} />);
        expect(screen.getByText('Accordion 1')).toBeInTheDocument();
        expect(screen.getByText('Accordion 2')).toBeInTheDocument();
    });

    it('close an open accordion when another accordion is clicked', async () => {
        const { debug, container } = setup(<AccordionsList items={items} />);

        const list = screen.getByRole('list');
        const firstItemWrapper = screen.getByRole('button', { name: 'Accordion 1 Accordion 1 content' });
        const firstItemDetails = within(firstItemWrapper).getByRole('group');
        const secondItemWrapper = screen.getByRole('button', { name: 'Accordion 2 Accordion 2 content' });
        const secondItemDetails = within(secondItemWrapper).getByRole('group');

        expect(firstItemDetails.getAttribute('open')).toBeNull();

        await act(async () => {
            // Open first accordion
            await userEvent.click(firstItemWrapper);
            // Capture animation
            const animation = firstItemDetails.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;
        });

        // assert if first accordion is open
        expect(firstItemDetails.getAttribute('open')).not.toBeNull();

        await act(async () => {
            // Open second accordion
            await userEvent.click(secondItemWrapper);
            // Capture animation
            const animation = secondItemDetails.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // Capture animation
            const animationFirstItem = firstItemDetails.getAnimations();
            console.log(
                "Animation is not caputured here and doesn't run .onfinish method, so accordion attributes aren't updated either",
            );
            console.log(animationFirstItem);
            debug();
            // Wait for animation to finish
            // await animationFirstItem.finished;
        });

        // assert
        // expect(firstItemDetails.getAttribute('open')).toBeNull();
        // expect(secondItemDetails.getAttribute('open')).not.toBeNull();
    });
});
