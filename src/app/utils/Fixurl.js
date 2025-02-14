export default function fixurl(text){
    return encodeURIComponent(text.trim().replace(/\s+/g, "-"));
  };