// Maps variety name -> real photo path, for varieties that have a confirmed
// accurate product photo. Varieties not listed here fall back to the
// botanical line illustration in VarietyIllustration.js.
//
// To add a new variety photo: drop the file in /public/images/varieties/
// and add an entry below. Remove the entry from here once done -- no other
// code changes needed, VarietyIllustration.js checks this map automatically.

export const VARIETY_PHOTOS = {
  'Broccoli': '/images/varieties/01-broccoli-microgreens.jpg',
  'Radish': '/images/varieties/02-radish-microgreens.jpg',
  'Red Cabbage': '/images/varieties/03-red-cabbage-microgreens.jpg',
  'Kale': '/images/varieties/04-kale-microgreens.jpg',
  'Mustard': '/images/varieties/05-mustard-microgreens.jpg',
  'Arugula': '/images/varieties/06-arugula-microgreens.jpg',
  'Kohlrabi': '/images/varieties/07-kohlrabi-microgreens.jpg',
  'Turnip': '/images/varieties/08-turnip-microgreens.jpg',
  'Watercress': '/images/varieties/09-watercress-microgreens.jpg',
  'Basil': '/images/varieties/10-basil-microgreens.jpg',
  'Cilantro': '/images/varieties/11-cilantro-microgreens.jpg',
  'Parsley': '/images/varieties/12-parsley-microgreens.jpg',
  'Dill': '/images/varieties/13-dill-microgreens.jpg',
  'Fennel': '/images/varieties/14-fennel-microgreens.jpg',
  'Chervil': '/images/varieties/15-chervil-microgreens.jpg',
  'Mint': '/images/varieties/16-mint-microgreens.jpg',
  // All 16 varieties now have confirmed real product photos.
}
