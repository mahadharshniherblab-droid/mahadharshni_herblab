// The home page is one long page. These routes show that page and scroll to their section,
// so after Shop comes Ingredients, then Contact, no matter which menu item was clicked.
export const SECTION_ROUTES = {
  '/': 'home',
  '/offers': 'seasonal-offer',
  '/about': 'about',
  '/shop': 'shop',
  '/ingredients': 'ingredients',
  '/contact': 'contact'
};

export const isSectionRoute = (pathname) => pathname in SECTION_ROUTES;
