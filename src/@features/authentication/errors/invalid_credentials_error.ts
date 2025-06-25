import type { Locale } from '@configs/i18n'

const dictionary: Record<Locale, string> = {
  br: "E-mail e/ou senha inválido(s)!",

  en: "Email and/or password invalid!",
}



export class InvalidCredentialsError extends Error {
  code: number
  message: string

  constructor(code: number, lang: Locale = 'br') {
    super()

    this.code = code
    this.message = dictionary[lang]
  }
}
