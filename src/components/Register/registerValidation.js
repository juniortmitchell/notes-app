const validatePassword = (password) => {
    // At least 8 characters, one uppercase letter, one lowercase letter, one number, one special character
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/
    if (passwordRegex.test(password) === false) {
        return false
    }

    return true
}

const validatePasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword
}

export const handlePasswords = (password, confirmPassword) => {
    if (!validatePassword(password)) {
        return false
    }

    if (!validatePasswordsMatch(password, confirmPassword)) {
        return false
    }

    return true
}

export const handleUsername = (username) => {
    // Username must be 3-20 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
}
