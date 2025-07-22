const authEndPoints = {
    login : "/auth/login",
}

const settingEndPoints = {
    emailchange : "/settings/email-change"
}

export const apiEndPoints = {
    ...authEndPoints,
    ...settingEndPoints

}