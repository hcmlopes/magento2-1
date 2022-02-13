import { useContext } from '@nuxtjs/composition-api';
import client from '~/api/client';
import cookieNames from '~/enums/cookieNameEnum';

export const useApiClient = () => {
  const { app } = useContext();
  const customerToken = app.$cookies.get(cookieNames.customerCookieName);
  let defaultHeaders = {
    store: app.$cookies.get(cookieNames.storeCookieName),
    authorization: undefined,
  };

  if (customerToken) {
    defaultHeaders.authorization = `Bearer ${customerToken}`;
  }


  // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unsafe-argument
  const request = (document, variables = null, requestHeaders = defaultHeaders) => client.request(document, variables, requestHeaders, );

  return {
    request,
  };
};

export default useApiClient;
