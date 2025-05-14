import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import  Register  from '../register';
import { NavigationContainer } from '@react-navigation/native';

// Mocks
const mockNavigate = jest.fn();
const mockHandleRegister = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));


// Controle de token simulado
let mockToken: string | null = null;

jest.mock('../../hooks/use-auth', () => ({
  useAuth: () => ({
    token: mockToken,
    handleRegister: mockHandleRegister,
  }),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

describe('Register screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockToken = null;
  });

  it('preenche formulário e chama handleRegister', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    );

    const inputNome = getByPlaceholderText('Digite seu nome...');
    const inputEmail = getByPlaceholderText('Digite seu email...');
    const inputSenha = getByPlaceholderText('Digite sua senha...');
    const botaoCadastrar = getByText('Cadastrar');

    await act(async () => {
      fireEvent.changeText(inputNome, 'João');
      fireEvent.changeText(inputEmail, 'joao@email.com');
      fireEvent.changeText(inputSenha, '123456');
      fireEvent.press(botaoCadastrar);

      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(mockHandleRegister).toHaveBeenCalledWith('João', 'joao@email.com', '123456');
  });

  it('redireciona para home se token estiver presente', () => {
    mockToken = 'mocked_token';

    render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    );

    expect(mockNavigate).toHaveBeenCalledWith('home');
  });
});