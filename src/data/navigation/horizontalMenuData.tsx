import { capitalize } from '@mui/material'

import type { HorizontalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'


export const menuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): HorizontalMenuDataType[] => [
  // This is how you will normally render submenu
  {
    label: capitalize(dictionary['navigation'].home),
    icon: 'tabler-smart-home',
    href: '/home'
  },
  {
    label: capitalize( dictionary['navigation'].resources),
    children: [
      {
        label: capitalize(dictionary['resources'].customers),
        icon: 'tabler-users',
        children: [
          {
            label: capitalize(dictionary['actions'].new),
            color: "info",
            href: '/customers/new'
          },
          {
            label: capitalize(dictionary['actions'].list),
            href: '/customers/list'
          },
        ]
      },
      {
        label: capitalize(dictionary['resources'].products),
        icon: 'tabler-shopping-cart',
        children: [
          {
            label: capitalize(dictionary['actions'].new),
            color: "info",
            href: '/products/new'
          },
          {
            label: capitalize(dictionary['actions'].list),
            href: '/products/list'
          },
        ]
      },
    ]
  }
]
