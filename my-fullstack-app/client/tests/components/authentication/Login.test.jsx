import { render, screen } from '@testing-library/react';
import Login from '../../../src/components/Authentication/Login';
import { BrowserRouter } from 'react-router-dom';
import userContext from '../../../src/context/userContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSetLoginStatus = vi.fn();
const mockSetUserID = vi.fn();

const mockUserContextValue = [false, mockSetLoginStatus, null, mockSetUserID];

describe('Login', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders login header', () => {
    render(
      <userContext.Provider value={mockUserContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </userContext.Provider>
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
