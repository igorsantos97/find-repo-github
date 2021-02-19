import { render } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/home';

// Teste apenas para achar a página HOME
describe('Find repo', () => {
  it('Find repo', () => {
    const { debug } = render(<Home />);
    debug();
  })
})