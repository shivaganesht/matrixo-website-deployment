// Configuration for beta vs production features
export const isBetaSite = process.env.NEXT_PUBLIC_SITE_MODE === 'beta' || 
                          (typeof window !== 'undefined' && window.location.hostname === 'beta.matrixo.in');

export const config = {
  isBeta: isBetaSite,
  siteName: isBetaSite ? 'matriXO Beta' : 'matriXO',
  features: {
    // Beta-only features
    advancedAnalytics: isBetaSite,
    enhancedEventManagement: isBetaSite,
    communityFeatures: isBetaSite,
    revenueTracking: isBetaSite,
    partnershipPortal: isBetaSite,
  }
};

export default config;
