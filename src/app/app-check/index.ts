import {
    AppCheck,
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
  } from "@firebase/app-check";
import { app } from "@/index";
import { FirebaseApp } from "@firebase/app";
  
  let appCheck: AppCheck | null = null;
  
  export function getOrInitializeAppCheck(app: FirebaseApp): AppCheck {
    if (appCheck) {
      return appCheck;
    }
  
    // Firebase uses a global variable to check if app check is enabled in a dev environment
    if (process.env.NODE_ENV !== "production") {
      Object.assign(window, {
        FIREBASE_APPCHECK_DEBUG_TOKEN:
          process.env.NEXT_PUBLIC_APP_CHECK_DEBUG_TOKEN,
      });
    }
  
    return (appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(
        process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY!
      ),
      isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
    }));
  }
  
  export function getAppCheck() {
  
    return getOrInitializeAppCheck(app);
  }