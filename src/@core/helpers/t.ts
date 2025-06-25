import { capitalize } from '@mui/material'


function process( dictionary: any, path: string | null = null, separator: string = '.'): any {

  if (path === null) return dictionary;

  const rp = path.split(separator)
  let translation = dictionary[rp[0]];

  for (let i = 1; i < rp.length; i++ ) {
    try {
      translation = translation[rp[i]];
    } catch ( err ) {
      console.error( `index ${i} not found on "${rp.join(", ")}". path: ${path}`)

      return path;
    }
  }

  return translation;
}


export function t( dictionary: any, path: string | null = null, separator: string = '.'): string {

  const translation = process(dictionary, path, separator);

  if ( typeof translation === "string" )
    return translation;

  console.warn(`translation not is a string...! path: ${path}`, translation)

  return path ?? "";
}

export function useT(dictionary: any, path: string | null = null, separator: string = '.') {
  return (key: string, cap: boolean = false, format: null | ((translated: string) => string) = null) => {
    let text = ''

    try {
      text = process(dictionary, path ? `${path}.${key}` : key, separator)

      if (!cap && format === null) return text

      if (cap) return capitalize(text)
      else return format!(text)
    } catch (error) {
      console.error(`key ${key} not found. path: ${path}`, error)
    }

    return key
  }
}
