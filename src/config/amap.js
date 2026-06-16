export const AMAP_KEY = import.meta.env.VITE_AMAP_KEY ?? '';
export const AMAP_SECURITY_CODE = import.meta.env.VITE_AMAP_SECURITY_CODE ?? '';

if (AMAP_SECURITY_CODE) {
  window._AMapSecurityConfig = {
    securityJsCode: AMAP_SECURITY_CODE,
  };
}
