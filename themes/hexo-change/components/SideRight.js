import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import CONFIG from '../config'
import { AnalyticsCard } from './AnalyticsCard'
import Announcement from './Announcement'
import Card from './Card'
import Catalog from './Catalog'
import CategoryGroup from './CategoryGroup'
import { InfoCard } from './InfoCard'
import LatestPostsGroup from './LatestPostsGroup'
import TagGroups from './TagGroups'
import { useState } from 'react'

const HexoRecentComments = dynamic(() => import('./HexoRecentComments'))
const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const [activeTab, setActiveTab] = useState('catalog')
  const {
    post,
    currentCategory,
    categories,
    latestPosts,
    tags,
    currentTag,
    showCategory,
    showTag,
    rightAreaSlot,
    notice
  } = props

  const { locale } = useGlobal()

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  // 文章全屏处理
  if (post && post?.fullWidth) {
    return null
  }

  const renderInfoContent = () => {
    return (
      <div className="space-y-4 flex flex-col items-center w-full">
        <div className="space-y-4 lg:w-60 pt-4 lg:pt-4 w-4/5">
          <InfoCard {...props} />
        </div>
        
        {siteConfig('HEXO_WIDGET_LATEST_POSTS', null, CONFIG) &&
          latestPosts &&
          latestPosts.length > 0 && (
            <div className="lg:w-60 w-4/5">
              <div className="bg-white dark:bg-hexo-black-gray p-4 rounded-xl border dark:border-black">
                <LatestPostsGroup {...props} />
              </div>
            </div>
        )}
        
        {notice && (
          <div className="lg:w-60 w-4/5">
            <Announcement post={notice} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      id='sideRight'
      className={`lg:w-80 lg:pt-8 ${post ? 'lg:pt-0' : 'lg:pt-4'}`}>
      <div className='sticky top-8 space-y-4'>
        {(!post || (post && post.toc && post.toc.length > 1)) && (
          <>
            {post?.toc?.length > 1 ? (
              <div className="bg-white dark:bg-hexo-black-gray p-4 rounded-xl border dark:border-black lg:block hidden">
                <div className="flex justify-center items-center pb-6 space-x-4">
                  <div
                    className={`cursor-pointer px-4 py-2 text-sm rounded-lg text-gray-600 transition duration-200 ease-out ${
                      activeTab === 'catalog' 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 hover:bg-blue-50'
                    }`}
                    onClick={() => handleTabClick('catalog')}
                  >
                    <i className="fas fa-list-ol"></i>
                    {activeTab === 'catalog' && <span className="pl-1">文章目录</span>}
                  </div>
                  <div
                    className={`cursor-pointer px-4 py-2 text-sm rounded-lg text-gray-600 transition duration-200 ease-out ${
                      activeTab === 'infoCard' 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 hover:bg-blue-50'
                    }`}
                    onClick={() => handleTabClick('infoCard')}
                  >
                    <i className="fas fa-chart-pie"></i>
                    {activeTab === 'infoCard' && <span className="pl-1">站点概览</span>}
                  </div>
                </div>
                {activeTab === 'catalog' && <Catalog toc={post.toc} />}
                {activeTab === 'infoCard' && renderInfoContent()}
              </div>
            ) : (
              <div className="lg:block hidden">
                {renderInfoContent()}
              </div>
            )}
          </>
        )}

        {siteConfig('HEXO_WIDGET_ANALYTICS', null, CONFIG) && (
          <AnalyticsCard {...props} />
        )}

        {showCategory && (
          <Card>
            <div className='ml-2 mb-1 '>
              <i className='fas fa-th' /> {locale.COMMON.CATEGORY}
            </div>
            <CategoryGroup
              currentCategory={currentCategory}
              categories={categories}
            />
          </Card>
        )}
        {showTag && (
          <Card>
            <TagGroups tags={tags} currentTag={currentTag} />
          </Card>
        )}

        {siteConfig('COMMENT_WALINE_SERVER_URL') &&
          siteConfig('COMMENT_WALINE_RECENT') && <HexoRecentComments />}

        {rightAreaSlot}
        <FaceBookPage />
        <Live2D />
      </div>
    </div>
  )
}