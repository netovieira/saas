import type { Locale } from '@configs/i18n'

const dictionary: Record<Locale, string> = {
  br: "Você precisa estar logado para realizar esta ação!",

  en: "You need to be logged in to perform this action!",
}

export class UnauthenticatedUserError extends Error {
  code: number
  message: string

  constructor(lang: Locale = 'br') {
    super()

    this.code = 403
    this.message = dictionary[lang]
  }
}
