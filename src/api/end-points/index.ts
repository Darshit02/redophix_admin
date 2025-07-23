const authEndPoints = {
    login : "/auth/login",
}

const settingEndPoints = {
    emailchange : "/settings/email-change"
}

const resetPasswordEndpoints = {
  resetPasswordEmailSend: "/settings/reset-password-email-send",
  resetPasswordConfirm: (token: string) => `/settings/reset-password/${token}`,
};

export const apiEndPoints = {
  ...authEndPoints,
  ...settingEndPoints,
  ...resetPasswordEndpoints,
};