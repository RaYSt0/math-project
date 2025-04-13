import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MissingNumberGame from './MissingNumberGame';

describe('MissingNumberGame', () => {
  test('renders the game with sequences and options', () => {
    render(<MissingNumberGame onComplete={() => {}} />);
    
    expect(screen.getByText('Задание 1: Выбери пропущенную цифру')).toBeInTheDocument();
    
    // Проверяем первую последовательность [1, 2, 3, 4, 5]
    const firstSequence = screen.getByTestId('full-sequence');
    expect(firstSequence).toHaveTextContent('1');
    expect(firstSequence).toHaveTextContent('5');
    
    // Проверяем вторую последовательность [3, 4, 5, ?]
    const secondSequence = screen.getByTestId('partial-sequence');
    expect(secondSequence).toHaveTextContent('3');
    expect(secondSequence).toHaveTextContent('?');
    
    // Проверяем варианты ответов
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('allows selecting a number', () => {
    render(<MissingNumberGame onComplete={() => {}} />);
    
    // Находим конкретный вариант ответа "6" через data-testid
    const option6 = screen.getByTestId('option-6');
    fireEvent.click(option6);
    
    expect(option6).toHaveClass('active');
  });

  test('marks game as completed on correct answer', () => {
    const mockOnComplete = jest.fn();
    render(<MissingNumberGame onComplete={mockOnComplete} />);
    
    const option6 = screen.getByTestId('option-6');
    fireEvent.click(option6);
    fireEvent.click(screen.getByText('Проверить'));
    
    expect(mockOnComplete).toHaveBeenCalled();
    expect(screen.getByText('Правильно! Молодец!')).toBeInTheDocument();
    expect(screen.getByText('Проверить')).toBeDisabled();
  });

  test('shows error on wrong answer', () => {
    render(<MissingNumberGame onComplete={() => {}} />);
    
    const option7 = screen.getByTestId('option-7');
    fireEvent.click(option7);
    fireEvent.click(screen.getByText('Проверить'));
    
    expect(screen.getByText('Неверно. Попробуйте ещё раз!')).toBeInTheDocument();
  });

  test('shows "Выберите вариант!" if no answer selected', () => {
    render(<MissingNumberGame onComplete={() => {}} />);
    
    fireEvent.click(screen.getByText('Проверить'));
    
    expect(screen.getByText('Выберите вариант!')).toBeInTheDocument();
  });

  test('resets the game on reset button click', () => {
    render(<MissingNumberGame onComplete={() => {}} />);
    
    const option6 = screen.getByTestId('option-6');
    fireEvent.click(option6);
    fireEvent.click(screen.getByText('Проверить'));
    fireEvent.click(screen.getByText('Сбросить'));
    
    expect(option6).not.toHaveClass('active');
    expect(screen.queryByText('Правильно! Молодец!')).not.toBeInTheDocument();
    expect(screen.getByTestId('missing-number')).toHaveTextContent('?');
  });
});
