'use client'

import axios from 'axios'

export const authHeader_Bearer = () => {
  let accessToken = localStorage.getItem('token')
  console.log({ accessToken })
  if (accessToken) {
    accessToken = accessToken.replace(/"/g, '')
    return { Authorization: 'Bearer ' + accessToken }
  } else {
    return {}
  }
}

export const instance = axios.create({
  //   baseURL: `${process.env.NEXT_PUBLIC_API_URL!}`,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL!}`,
  headers: {
    Accept: 'application/json'
  }
})

instance.interceptors.request.use(
  async (config) => {
    const authHeader = authHeader_Bearer()
    // @ts-ignore
    config.headers = {
      ...config.headers,
      ...authHeader
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ✅ Keep response interceptor for handling errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 403) {
      localStorage.removeItem('accessToken')
      window.location.href = '/'
    }

    if (error?.response?.status === 401) {
      // const refreshToken = Cookies.get(ECookiesKey.REFRESH_TOKEN);
      // if (!refreshToken) {
      //   Cookies.remove(ECookiesKey.ACCESS_TOKEN);
      //   window.location.href = "/";
      // } else {
      //   try {
      //     const res = await authServices.refreshToken({ refreshToken });
      //     const accessToken = get(res, "data.accessToken", "");
      //     const newRefreshToken = get(res, "data.refreshToken", "");
      //     Cookies.set(ECookiesKey.ACCESS_TOKEN, accessToken);
      //     Cookies.set(ECookiesKey.REFRESH_TOKEN, newRefreshToken);
      //   } catch (e) {
      //     Cookies.remove(ECookiesKey.REFRESH_TOKEN);
      //     Cookies.remove(ECookiesKey.ACCESS_TOKEN);
      //     window.location.href = "/";
      //   }
      // }
    }

    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message
      })
    } else if (error.request) {
      return Promise.reject(error.request)
    } else {
      return Promise.reject(error)
    }
  }
)

export const flashXApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FLASHX_API_URL}`,
  headers: {
    Accept: 'application/json'
  }
})

export const marketApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_MARKET}`,
  headers: {
    Accept: 'application/json'
  }
})
