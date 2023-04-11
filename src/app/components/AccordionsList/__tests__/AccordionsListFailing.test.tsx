import { render, screen, within, waitFor } from '@testing-library/react';
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

describe('AccordionsList (Failing)', () => {
    it('renders accordions list', () => {
        render(<AccordionsList items={items} />);
        expect(screen.getByText('Accordion 1')).toBeInTheDocument();
        expect(screen.getByText('Accordion 2')).toBeInTheDocument();
    });

    it('close an open accordion when another accordion is clicked', async () => {
        const { user } = setup(<AccordionsList items={items} />);

        const firstItemWrapper = screen.getByRole('button', { name: 'Accordion 1 Accordion 1 content' });
        const firstItemDetails = within(firstItemWrapper).getByRole('group');
        const secondItemWrapper = screen.getByRole('button', { name: 'Accordion 2 Accordion 2 content' });
        const secondItemDetails = within(secondItemWrapper).getByRole('group');

        expect(firstItemDetails.getAttribute('open')).toBeNull();

        await user.click(firstItemWrapper);

        await waitFor(async () => {
            // Capture animation
            const animation = firstItemDetails.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // Assert
            expect(firstItemDetails).toBeInTheDocument();
            expect(firstItemDetails.getAttribute('open')).not.toBeNull();
        });

        // Open second accordion
        await user.click(secondItemWrapper);

        await waitFor(async () => {
            // Capture animation
            const animation = firstItemDetails.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // Assert
            expect(firstItemDetails).toBeInTheDocument();
            expect(secondItemDetails).toBeInTheDocument();
            expect(firstItemDetails.getAttribute('open')).toBeNull();
            expect(secondItemDetails.getAttribute('open')).not.toBeNull();
        });
    });

    it('opens a second accordion without closing the current open accordion(s)', async () => {
        const { user } = setup(<AccordionsList multiExpand items={items} />);

        const firstItemWrapper = screen.getByRole('button', { name: 'Accordion 1 Accordion 1 content' });
        const firstItemDetails = within(firstItemWrapper).getByRole('group');
        const secondItemWrapper = screen.getByRole('button', { name: 'Accordion 2 Accordion 2 content' });
        const secondItemDetails = within(secondItemWrapper).getByRole('group');

        expect(firstItemDetails.getAttribute('open')).toBeNull();

        await user.click(firstItemWrapper);

        await waitFor(async () => {
            // Capture animation
            const animation = firstItemDetails.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // Assert
            expect(firstItemDetails).toBeInTheDocument();
            expect(firstItemDetails.getAttribute('open')).not.toBeNull();
        });

        // Open second accordion
        await user.click(secondItemWrapper);

        await waitFor(async () => {
            // Capture animation
            const animation = secondItemDetails.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // Assert
            expect(firstItemDetails).toBeInTheDocument();
            expect(secondItemDetails).toBeInTheDocument();
            expect(firstItemDetails.getAttribute('open')).not.toBeNull();
            expect(secondItemDetails.getAttribute('open')).not.toBeNull();
        });
    });
});
