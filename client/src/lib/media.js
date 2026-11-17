// Media folder works both from the dev server (/media/) and the offline HTML file (file://).
export const MEDIA = location.protocol === 'file:' ? 'preview/site/media/' : '/media/';
