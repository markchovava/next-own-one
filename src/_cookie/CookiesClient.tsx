"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";


export const cookieDuration = 60 * 60 * 24 * 30 * 30;

export const AuthTokenCookieName = 'KEGAN_CONSULTING_AUTH_TOKEN_COOKIE'
export const UserCookieName = 'KEGAN_CONSULTING_CURRENT_USER_COOKIE'
export const CartCookieName = 'KEGAN_CONSULTING_CART_COOKIE'
export const CartItemCookieName = 'KEGAN_CONSULTING_CART_ITEMS_COOKIE'

export const setTheCookie = async (name: string = AuthTokenCookieName, token: string) => {
    await setCookie(name, token, { maxAge: cookieDuration });
}

export const getTheCookie = (name: string = AuthTokenCookieName) => {
    return getCookie(name);
}

export const removeTheCookie = async (name: string = AuthTokenCookieName) => {
    await deleteCookie(name);
}