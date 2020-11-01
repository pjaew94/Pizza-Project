import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => render(<Home/>, { wrapper: MemoryRouter }))
afterAll(() => cleanup());

test('Home renders without failing', () => {
 
    expect(screen.getByTestId('home')).toBeInTheDocument();
})

test("Home title is being displayed", () => {
  
    expect(screen.getByTestId("home-title")).toHaveTextContent("Award winning pizza right to your door step!")
})


test("Home pizza image is being displayed", () => {
  
    expect(screen.getByAltText("good lookin pizza")).toHaveAttribute('src', 'https://jwppizza.s3.amazonaws.com/Home+Pizza.png')
})






