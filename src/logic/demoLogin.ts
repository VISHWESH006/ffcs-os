export type DemoLoginValidation = 'valid' | 'required-fields' | 'invalid-captcha';

export function validateDemoLogin(registerNumber: string, password: string, captcha: string): DemoLoginValidation {
  if (!registerNumber.trim() || !password.trim() || !captcha.trim()) return 'required-fields';
  const normalizedCaptcha = captcha.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return normalizedCaptcha === '7K4P' ? 'valid' : 'invalid-captcha';
}
