import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from './FormInput';

describe('FormInput', () => {
  it('should render input with label', () => {
    render(
      <FormInput
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(
      <FormInput
        label="Required Field"
        value=""
        onChange={() => {}}
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    render(
      <FormInput
        label="Test Input"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should show validation error after touch', () => {
    const validator = (value) => ({
      isValid: value.length > 0,
      message: 'This field is required'
    });

    render(
      <FormInput
        label="Test Input"
        value=""
        onChange={() => {}}
        validator={validator}
      />
    );

    const input = screen.getByLabelText('Test Input');
    
    // Should not show error initially
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();

    // Should show error after blur
    fireEvent.blur(input);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should show help text when no error', () => {
    render(
      <FormInput
        label="Test Input"
        value="valid"
        onChange={() => {}}
        helpText="This is help text"
      />
    );

    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('should hide help text when there is an error', () => {
    const validator = (value) => ({
      isValid: false,
      message: 'Error message'
    });

    render(
      <FormInput
        label="Test Input"
        value=""
        onChange={() => {}}
        validator={validator}
        helpText="This is help text"
      />
    );

    const input = screen.getByLabelText('Test Input');
    fireEvent.blur(input);

    expect(screen.queryByText('This is help text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should apply error styling when invalid', () => {
    const validator = (value) => ({
      isValid: false,
      message: 'Error message'
    });

    render(
      <FormInput
        label="Test Input"
        value=""
        onChange={() => {}}
        validator={validator}
      />
    );

    const input = screen.getByLabelText('Test Input');
    fireEvent.blur(input);

    expect(input).toHaveClass('border-red-500');
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <FormInput
        label="Test Input"
        value=""
        onChange={() => {}}
        disabled
      />
    );

    const input = screen.getByLabelText('Test Input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
  });

  it('should handle different input types', () => {
    render(
      <FormInput
        label="Password Input"
        type="password"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText('Password Input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should apply custom className', () => {
    render(
      <FormInput
        label="Test Input"
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    );

    const input = screen.getByLabelText('Test Input');
    expect(input).toHaveClass('custom-class');
  });
});