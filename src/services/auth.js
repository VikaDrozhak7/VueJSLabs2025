const KEY = 'lab2_user'

let listeners = []

export function getCurrentUser() {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
}

export function login({ email, password }) {
    if (!email || !password) throw new Error('Email і пароль обовʼязкові')
    const user = { id: 1, name: email.split('@')[0], email, token: 'fake-jwt' }
    localStorage.setItem(KEY, JSON.stringify(user))
    emit(user)
    return user
}

export function register({ name, email, password, confirmPassword }) {
    if (!name || !email || !password) throw new Error('Заповніть поля')
    if (password !== confirmPassword) throw new Error('Паролі не збігаються')
    const user = { id: 1, name, email, token: 'fake-jwt' }
    localStorage.setItem(KEY, JSON.stringify(user))
    emit(user)
    return user
}

export function logout() {
    localStorage.removeItem(KEY)
    emit(null)
}

export function isAuthenticated() {
    return !!getCurrentUser()
}

export function onAuthStateChanged(cb) {
    listeners.push(cb)
    return () => (listeners = listeners.filter(l => l !== cb))
}

function emit(val) { listeners.forEach(l => l(val)) }

