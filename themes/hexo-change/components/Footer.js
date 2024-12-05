import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

//   return (
//     <footer className='relative z-10 dark:bg-black flex-shrink-0 bg-hexo-light-gray justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm p-6'>
//       {/* <DarkModeButton/> */}
//       <i className='fas fa-copyright' /> {`${copyrightDate}`}
//       <span>
//         <i className='mx-1 animate-pulse fas fa-heart' />
//         <a
//           href={siteConfig('LINK')}
//           className='underline font-bold  dark:text-gray-300 '>
//           {siteConfig('AUTHOR')}
//         </a>
//         .<br />
//         <BeiAnSite />
//         <BeiAnGongAn />
//         {/* <span className='hidden busuanzi_container_site_pv'>
//           <i className='fas fa-eye' />
//           <span className='px-1 busuanzi_value_site_pv'> </span>
//         </span>
//         <span className='pl-2 hidden busuanzi_container_site_uv'>
//           <i className='fas fa-users' />
//           <span className='px-1 busuanzi_value_site_uv'> </span>
//         </span> */}
//       <div id="statistics" className='flex justify-center items-center'>
//        <span className='hidden busuanzi_container_site_pv'>
//              <i className='fas fa-eye'/>
//             <span className='px-1 busuanzi_value_site_pv'></span>  
//         </span>
//         <span className='pl-2 hidden busuanzi_container_site_uv'>
//           <i className='fas fa-users'/> <span className='px-1 busuanzi_value_site_uv'> </span> 
//         </span>
//        </div>
//         <h1 className='text-xs pt-4 text-light-400 dark:text-gray-400'>
//           {title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
//         </h1>
//         {/* <PoweredBy className='justify-center' /> */}
//       </span>
//       <br />
//     </footer>
//   )
// }

return (
  <footer
    className={`relative z-1 dark:bg-hexo-background-black lg:max-w-75p flex-shrink-0 bg-hexo-background-gray justify-center text-center m-auto leading-6  text-gray-600 dark:text-gray-100 text-sm pt-8 pb-2`}>
    {/* <DarkModeButton/> */}
    <div id="status" className={`width-full align-center mt-2 lg:max-w-custom`}>
      <div id="copyright" className='flex justify-center items-center'>
        <span className='inline-block px-1'><i className='iconfont icon-copyright' />
        </span>
         {`${copyrightDate}`} 
        {/* <i className='mx-1 animate-pulse fas fa-heart' /> */}
        <span className='inline-block animate-spin-slow ml-3 mr-1' style={{color:'pink'}}>
        <i className='iconfont icon-sakura' /></span>
        <a href={siteConfig('LINK')} className=' dark:text-gray-300 mr-2'>{title}</a>
        {/* 备案 */}
        <BeiAnSite /><BeiAnGongAn />  <br/>
      </div>
      <div id="statistics" className='flex justify-center items-center'>
        <span className='hidden busuanzi_container_site_pv'>
            <i className='fas fa-eye'/>
            <span className='px-1 busuanzi_value_site_pv'></span>  
        </span>
        <span className='pl-2 hidden busuanzi_container_site_uv'>
          <i className='fas fa-users'/> <span className='px-1 busuanzi_value_site_uv'> </span> 
        </span>
      </div>
      <h1 className='text-xs pt-2 text-light-400 dark:text-gray-400'>{siteConfig('AUTHOR')} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}</h1>
      {/* <p className='text-xs pt-2 text-light-500 dark:text-gray-500'>Thankyou by <a href='https://github.com/tangly1024/NotionNext' className='dark:text-gray-300'>NotionNext {siteConfig('VERSION')}</a>.</p> */}
    </div>
  </footer>
)
}

export default Footer
