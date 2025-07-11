import { h } from 'vue'
import type { IconSet, IconAliases, IconProps } from 'vuetify'

const aliases: IconAliases = {
  tidal: '@assets/icons/tidal.svg',
}

const custom: IconSet = {
  component: (props: IconProps) => h(aliases),
}

export { aliases, custom }
