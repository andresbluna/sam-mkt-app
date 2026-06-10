export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (password.length < 6) {
    return { isValid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos una mayúscula' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos un número' };
  }
  return { isValid: true };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validatePrompt = (prompt: string): boolean => {
  return prompt.trim().length >= 10;
};

export const validateCaption = (caption: string): boolean => {
  return caption.trim().length > 0;
};

export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Algo salió mal. Por favor, intenta de nuevo.';
};

