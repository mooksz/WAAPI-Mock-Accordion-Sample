import { act } from 'react-dom/test-utils';
import { screen, render } from '@testing-library/react';
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
        setup(<Accordion label="Label">Content</Accordion>);

        const wrapper = screen.getByRole('button');
        const details = screen.getByRole('group');

        expect(details.getAttribute('open')).toBeNull();

        await act(async () => {
            // Open accordion
            await userEvent.click(wrapper);
            // Capture animation
            const animation = details.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;
        });

        // assert
        expect(details.getAttribute('open')).not.toBeNull();

        await act(async () => {
            // Close accordion
            await userEvent.click(wrapper);
            // Capture animation
            const animation = details.getAnimations()[0];
            // Wait for animation to finish
            await animation.finished;
        });

        // assert
        expect(details.getAttribute('open')).toBeNull();
    });
});
