/**
 * 一些插件
 */
module.exports = {
  // 网站全文搜索
  ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || null, // 在这里查看 https://dashboard.algolia.com/account/api-keys/
  ALGOLIA_ADMIN_APP_KEY: process.env.ALGOLIA_ADMIN_APP_KEY || null, // 管理后台的KEY，不要暴露在代码中，在这里查看 https://dashboard.algolia.com/account/api-keys/
  ALGOLIA_SEARCH_ONLY_APP_KEY:
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_APP_KEY || null, // 客户端搜索用的KEY
  ALGOLIA_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_INDEX || null, // 在Algolia中创建一个index用作数据库

  // AI 文章摘要生成

  AI_SUMMARY_API: process.env.AI_SUMMARY_API || '',
  AI_SUMMARY_KEY: process.env.AI_SUMMARY_KEY || '',
  AI_SUMMARY_CACHE_TIME: process.env.AI_SUMMARY_CACHE_TIME || 1800, // 缓存时间，单位秒
  AI_SUMMARY_WORD_LIMIT: process.env.AI_SUMMARY_WORD_LIMIT || 1000,

  //   ********挂件组件相关********
  // AI 文章摘要生成 @see https://docs_s.tianli0.top/
  TianliGPT_CSS:
    process.env.NEXT_PUBLIC_TIANLI_GPT_CSS ||
    'https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.css',
  TianliGPT_JS:
    process.env.NEXT_PUBLIC_TIANLI_GPT_JS ||
    'https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.js',
  TianliGPT_KEY: process.env.NEXT_PUBLIC_TIANLI_GPT_KEY || '',

  // 邮件
  MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID || null, // 开启mailichimp邮件订阅 客户列表ID ，具体使用方法参阅文档
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY || null, // 开启mailichimp邮件订阅 APIkey

  //**************** 自定义配置官方没有提供，需要自己手动引入 start  ****************
  //url匹配
  URL_HEADER_PATHS: process.env.NEXT_PUBLIC_URL_HEADER_PATHS || ['/archive', '/category', '/tag','/memos'], // 随记url匹配
  // Memos 随记 @see https://github.com/usememos/usememos
  MEMOS_ENABLE: process.env.NEXT_PUBLIC_MEMOS_ENABLE || false, // 开关
  MEMOS_HOST: process.env.NEXT_PUBLIC_MEMOS_HOST || 'https://memos.chenge.ink', // 随记地址
  MEMOS_LIMIT: process.env.NEXT_PUBLIC_MEMOS_LIMIT || '10',// 随记数量
  MEMOS_DOM_ID: process.env.NEXT_PUBLIC_MEMOS_DOM_ID || '#memos',// 随记dom id
  MEMOS_CREATOR_ID: process.env.NEXT_PUBLIC_MEMOS_CREATOR_ID || '1',// 随记创建者id
  MEMOS_USERNAME: process.env.NEXT_PUBLIC_MEMOS_USERNAME || 'keney', // 随记用户名
  MEMOS_NAME: process.env.NEXT_PUBLIC_MEMOS_NAME || 'keney', // 随记名称
  MEMOS_GET_HOST_URL: process.env.NEXT_PUBLIC_MEMOS_GET_HOST_URL || 'https://memos.chenge.ink',// 随记地址
  MEMOS_GET_CREATOR_ID: process.env.NEXT_PUBLIC_MEMOS_GET_CREATOR_ID || '1',// 随记创建者id
  MEMOS_GET_TAG: process.env.NEXT_PUBLIC_MEMOS_GET_TAG || 'images',// 随记标签
  MEMOS_GET_PUBLIC: process.env.NEXT_PUBLIC_MEMOS_GET_PUBLIC || 'PUBLIC',// 随记公开状态
  MEMOS_GALLERY_ENABLE: process.env.NEXT_PUBLIC_MEMOS_GALLERY_ENABLE || false,// 随记画册开关

  //**************** 自定义配置官方没有提供，需要自己手动引入 start  ****************
}
