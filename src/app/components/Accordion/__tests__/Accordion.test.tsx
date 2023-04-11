import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../Accordion';
import { mockAnimationsApi } from 'jsdom-testing-mocks';

mockAnimationsApi();

function setup(jsx: React.ReactElement) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

describe('Accordion', () => {
    it('should render', () => {
        render(<Accordion label="Label">Content</Accordion>);
        expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should open and close', async () => {
        const { user } = setup(<Accordion label="Label">Content</Accordion>);

        const wrapper = screen.getByRole('button');
        const details = screen.getByRole('group');

        expect(details.getAttribute('open')).toBeNull();

        await user.click(wrapper);

        await waitFor(async () => {
            // Capture animation
            const animation = details.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // assert
            expect(details).toBeInTheDocument();
            expect(details.getAttribute('open')).not.toBeNull();
        });

        await user.click(wrapper);

        await waitFor(async () => {
            // Close accordion
            // Capture animation
            const animation = details.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;

            // assert
            expect(details).toBeInTheDocument();
            expect(details.getAttribute('open')).toBeNull();
        });
    });
});
