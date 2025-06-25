import Typography from '@mui/material/Typography'

import type { TypographyProps } from '@mui/material/Typography/Typography'

export function Th({ ...superProps }: TypographyProps) {
  return <Typography {...superProps}>{superProps.children}</Typography>
}
