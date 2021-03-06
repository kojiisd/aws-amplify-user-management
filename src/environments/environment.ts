// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'REGION',
      userPoolId: 'USER_POOL_ID',
      userPoolWebClientId: 'USER_POOL_WEB_CLIENT_ID',
      identityPoolId: 'IDENTITY_POOL_ID'
    }
  },

  apiBaseUrl: 'API_BASE_URL',

  localstorageBaseKey: 'LOCAL_STORAGE_BASE_KEY'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
