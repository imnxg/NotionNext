// import { useRouter } from 'next/router'
// import { getLayoutByTheme } from '@/themes/theme'
import { DynamicLayout } from '@/themes/theme'
import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import React from 'react'
import BLOG from '@/blog.config'

const MemosIndex = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutMemos' {...props} />
  //下面的方法适用于4.4.2及以下版本
  // const Layout = getLayoutByTheme({ theme: siteConfig('THEME'), router: useRouter() })
  // return <Layout {...props} />
}

export async function getStaticProps() {
  const from = 'tag-index-props'
  const props = await getGlobalData({ from })
  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default MemosIndex
