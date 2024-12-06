import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG from '../config'

const MenuGroupCard = props => {
  const { postCount, categoryOptions, tagOptions } = props
  const { locale } = useGlobal()
  const archiveSlot = <div className='text-center'>{postCount}</div>
  const categorySlot = (
    <div className='text-center'>{categoryOptions?.length}</div>
  )
  const tagSlot = <div className='text-center'>{tagOptions?.length}</div>

  const links = [
    {
      name: locale.COMMON.ARTICLE,
      href: '/archive',
      slot: archiveSlot,
      show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG)
    },
    {
      name: locale.COMMON.CATEGORY,
      href: '/category',
      slot: categorySlot,
      show: siteConfig('HEXO_MENU_CATEGORY', null, CONFIG)
    },
    {
      name: locale.COMMON.TAGS,
      href: '/tag',
      slot: tagSlot,
      show: siteConfig('HEXO_MENU_TAG', null, CONFIG)
    }
  ]

  for (let i = 0; i < links.length; i++) {
    if (links[i].id !== i) {
      links[i].id = i
    }
  }

  return (
    // <nav id='nav' 
    // className='leading-8 flex justify-center mt-4 dark:text-gray-200 w-full divide-x divide-black dark:divide-white'>
<nav
  id='nav'
  className='leading-8 flex justify-center items-center dark:text-gray-200 w-full'>
  <div className='flex flex-nowrap'>  {/* 添加这个不换行的容器 */}
    {links.map(link => {
      if (link.show) {
        return (
          <Link
            key={`${link.href}`}
            title={link.href}
            href={link.href}
            target={link?.target}
            className={'px-2 duration-300 text-base justify-center items-center cursor-pointer whitespace-nowrap'}>  {/* 添加 whitespace-nowrap */}
              <div className='w-full items-center justify-center hover:scale-105 duration-200 transform hover:text-hexo-primary'>
                <div className='text-center text-md'>{link.name}</div>
                <div className='text-center font-semibold'>{link.slot}</div>
              </div>
          </Link>
        )
      } else {
        return null
      }
    })}
  </div>
</nav>
  )
}
export default MenuGroupCard
