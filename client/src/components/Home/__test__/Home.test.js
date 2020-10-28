import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import Home from '../Home';

afterAll(() => cleanup());

test('Home renders without failing', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
})

test("Home title is being displayed", () => {
    const { getByText } = render(<Home />);
    expect(screen.getByTestId("home-title")).toHaveTextContent("Award winning pizza right to your door step!")
})


test("Home pizza image is being displayed", () => {
    render(<Home />)
    expect(screen.getByAltText("good lookin pizza")).toHaveAttribute('src', 'https://jwppizza.s3.amazonaws.com/Home+Pizza.png')
})






