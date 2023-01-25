
export const redirectToLogin = () => {
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        }
    }
}
