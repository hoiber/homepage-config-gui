import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage config builder application', () => {
  render(<App />);
  const headerElement = screen.getByText(/Homepage Config Builder/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders services navigation tab', () => {
  render(<App />);
  const servicesTab = screen.getByText('Services');
  expect(servicesTab).toBeInTheDocument();
});

test('renders basic application structure', () => {
  render(<App />);
  
  // Check for main sections
  expect(screen.getByText('Services')).toBeInTheDocument();
  expect(screen.getByText(/Homepage Config Builder/i)).toBeInTheDocument();
  
  // Should not crash when rendering
  expect(document.body).toContainHTML('Homepage Config Builder');
});
