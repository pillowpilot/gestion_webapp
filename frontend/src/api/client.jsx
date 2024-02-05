import axios from "axios";

export const LOCALSTORAGE_REFRESH_TOKEN = "refresh_token";
export const LOCALSTORAGE_ACCESS_TOKEN = "access_token";

const buildApiClient = () => {
  const baseURL = "http://localhost:8000/";

  const instance = axios.create({
    baseURL: baseURL,
  });

  // Add Request Interceptors
  // onFullfilled: add JWT Access Token to the request
  // onRejected: do nothing (identity fn)
  const addJWTAccessToken = (config) => {
    const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
    if(accessToken !== null)
      config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }
  instance.interceptors.request.use(addJWTAccessToken);

  // Add Response Interceptors
  // onFullfilled: do nothing (identity fn)
  // onRejected: refresh JWT Access Token if 401 and resend the original request
  const refreshJWTAccessToken = async (error) => {
    const originalRequest = error.config;

    // If jwtRefreshToken does not exists, the user is unauthenticated (ie. in login page).
    // If we receive a 401 Unauthorized with an unauthenticated user, ignore.
    const jwtRefreshToken = localStorage.getItem(LOCALSTORAGE_REFRESH_TOKEN);
    console.log(error);
    if(error?.response?.status === 401 && jwtRefreshToken) {
      
      try {
        const url = `${baseURL}api/token/refresh/`;
        const refreshResponse = await axios.post(url, {refresh: jwtRefreshToken}); // DO NOT use instance for the refresh
        localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, refreshResponse.data.access);
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return instance(originalRequest);
      }catch(err){
        console.log(err);
        localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    // Throw unhandled errors
    return Promise.reject(error);
  };
  instance.interceptors.response.use(c => c, refreshJWTAccessToken);

  return instance;
};

const apiClient = buildApiClient();

export const Api = {
    whoami: () => apiClient.get(`/api/whoami/`),
    login: (data) => apiClient.post(`/api/token/`, data),
    retrieveCompany: (id) => apiClient.get(`/api/companies/${id}`),
    retrieveCompanyParcels: (id) => apiClient.get(`/api/companies/${id}/parcels/`),
    retrieveCompanyLots: (id) => apiClient.get(`/api/companies/${id}/lots/`),
    
    listUsers: () => apiClient.get(`/api/users/`),
    createUser: (data) => apiClient.post(`/api/users/`, data),
    retrieveUser: (id) => apiClient.get(`/api/users/${id}/`),
    updateUser: (id, data) => apiClient.put(`/api/users/${id}/`, data),

    listProperties: () => apiClient.get(`/api/parcels/`),
    createProperty: (data) => apiClient.post(`/api/parcels/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    }),
    retrieveProperty: (id) => apiClient.get(`/api/parcels/${id}/`),
    updateProperty: (id, data) => apiClient.put(`/api/parcels/${id}/`, data),

    listLots: () => apiClient.get(`/api/lots/`),
    createLot: (data) => apiClient.post(`/api/lots/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    }),
    retrieveLot: (id) => apiClient.get(`/api/lots/${id}/`),
    updateLot: (id, data) => apiClient.put(`/api/lots/${id}/`, data),
    partiallyUpdateLot: (id, data) => apiClient.patch(`/api/lots/${id}/`, data),
    deleteLot: (id) => apiClient.delete(`/api/lots/${id}/`),

    listInferences: () => apiClient.get(`/api/inferences/`),
    createInference: (data) => apiClient.post(`/api/inferences/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    }),
    retrieveInference: (id) => apiClient.get(`/api/inferences/${id}/`),
    deleteInference: (id) => apiClient.delete(`/api/inferences/${id}/`),
}

export default apiClient;