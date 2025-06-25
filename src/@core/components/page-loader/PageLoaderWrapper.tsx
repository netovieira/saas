'use client'

import { useTheme } from '@mui/material/styles'
import NextTopLoader from 'nextjs-toploader'

const PageLoaderWrapper = () => {
  const theme = useTheme()
  const color = theme.palette.primary.main
  const themeShadow = `0 0 10px ${color},0 0 5px ${color}`

  return (
    <NextTopLoader
      height={3}
      color={color}
      shadow={themeShadow}
    />
  )
}

export default PageLoaderWrapper
