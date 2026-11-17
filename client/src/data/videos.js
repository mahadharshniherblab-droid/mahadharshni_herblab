// Short demo clip for each product, shown as a second slide on the product
// page (swipe or use the dots under the photo). Add a file to
// public/media/videos/ and list it here by the product's id - the id shown
// in the admin dashboard (e.g. "byewart-8456" for an oil variant added
// there), not just the slug.
export const PRODUCT_VIDEOS = {
  'ortho-g': '/media/videos/ortho-g.mp4',
  keshdharshni: '/media/videos/keshdharshni.mp4',
  byewart: '/media/videos/byewart-gel.mp4',
  'byewart-8456': '/media/videos/byewart-oil.mp4'
};

export function videoFor(id) {
  return PRODUCT_VIDEOS[id] ?? null;
}
