import Cookies from 'js-cookie';

export interface AuthTokens {
    accessToken: string;
}

export const CookieKeys = {
    ACCESS_TOKEN: 'access_token',
    USERNAME: 'username'
} as const;

export const cookieService = {
    // Save tokens
    setToken: (tokens: AuthTokens): void => {
        Cookies.set(CookieKeys.ACCESS_TOKEN, tokens.accessToken, {
            expires: 0.01, // 15 minutes
            secure: true,
            sameSite: 'strict',
            // path: '/', // optional: specify path
        });
    },

    setUsername: (username?: string): void => {
        Cookies.set(CookieKeys.USERNAME, username ?? "", {
            expires: 0.01,
            secure: true,
            sameSite: 'strict',
        });
    },

    // Get token
    getAccessToken: (): string | undefined => {
        return Cookies.get(CookieKeys.ACCESS_TOKEN);
    },

    getUsername: (): string | undefined => {
        return Cookies.get(CookieKeys.USERNAME)
    },


    // Remove tokens
    clearKeys: (): void => {
        Cookies.remove(CookieKeys.ACCESS_TOKEN);
        Cookies.remove(CookieKeys.USERNAME);
    },

    // Check if token exists
    hasToken: (): boolean => {
        return !!Cookies.get(CookieKeys.ACCESS_TOKEN);
    },
};