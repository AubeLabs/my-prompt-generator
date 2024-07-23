const ROLE_KEY = 'chatgpt_prompt_role';

export const saveRoleToLocalStorage = (role: string) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRoleFromLocalStorage = (): string | null => {
  return localStorage.getItem(ROLE_KEY);
};