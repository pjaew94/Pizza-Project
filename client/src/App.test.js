import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { MemeoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import App from '../App';

test('full app rendering/navigating', () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App />
        </Router>
    )

    const leftClick = { button: 0}
    userEvent.click(screen.getByText(/))
})

