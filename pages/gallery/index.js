import { DynamicLayout } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import React from 'react'
import BLOG from '@/blog.config'

const GalleryIndex = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutMemosGallery' {...props} />
}

export async function getStaticProps() {
  const from = 'gallery-index-props'
  const props = await getGlobalData({ from })
  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default GalleryIndex