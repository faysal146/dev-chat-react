export function errorMessage(code) {
	if(code === 'auth/user-not-found') return 'user not found'
	if(code === 'auth/email-already-in-use') return 'email address already in use'
	if(code === 'auth/wrong-password') return 'email or password is not match'
	return 'something went wrong'
}