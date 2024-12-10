import React, { useEffect, useState } from 'react';
import { loadExternalResource } from '@/lib/utils';
import { siteConfig } from '@/lib/config'

const BlogMemos = () => {
    const [isResourcesLoaded, setResourcesLoaded] = useState(false);
    const [error, setError] = useState(null);

    // 加载资源
    useEffect(() => {
        const loadResources = async () => {
            try {
                await Promise.all([
                    loadExternalResource('/css/memos.css', 'css'),
                    loadExternalResource('/css/highlight.github.min.css', 'css'),
                    loadExternalResource('/js/lazyload.min.js?v=17.8.3', 'js'),
                    loadExternalResource('/js/marked.min.js?v=11.1.1', 'js'),
                    loadExternalResource('/js/view-image.min.js?v=2.0.2', 'js'),
                    loadExternalResource('/js/highlight.min.js?v=11.9.0', 'js'),
                    loadExternalResource('/js/moment.min.js?v=2.30.1', 'js'),
                ]);
                
                await loadExternalResource('/js/moment.twitter.js', 'js');
                setResourcesLoaded(true);
            } catch (err) {
                console.error('Failed to load resources:', err);
                setError(err);
            }
        };

        loadResources();
    }, []);

    // 从配置文件读取 Memos 配置
// var memoConfig = {
//     host: 'https://memos.chenge.ink',
//     limit: '10',
//     creatorId: '1',
//     domId: '#memos',
//     username: '陈源泉',
//     name: '尘歌'
// }

    // 初始化 Memos
    useEffect(() => {
        if (isResourcesLoaded) {
            try {
                console.log(siteConfig('MEMOS_ENABLE'))
                if(siteConfig('MEMOS_ENABLE')==='false'){
                    console.log("memos is not enabled")
                    return
                }
                // if(!siteConfig('MEMOS_ENABLE')){
                   
                //     return
                // }
                // 设置全局配置
                 // 将配置注入到window对象中供memos.js使用
                //注意避免 污染全局变量 todo:后续可以优化，使用createContext状态管理
                window.memoConfig = {
                    host: siteConfig('MEMOS_HOST'),
                    limit: siteConfig('MEMOS_LIMIT'),
                    creatorId: siteConfig('MEMOS_CREATOR_ID'),
                    domId: siteConfig("MEMOS_DOM_ID"),
                    username: siteConfig('MEMOS_USERNAME'),
                    name: siteConfig('MEMOS_NAME')
                };
                

                const script = document.createElement('script');
                script.src = '/js/memos.js';
                script.async = true;
                document.body.appendChild(script);

                return () => {
                    document.body.removeChild(script);
                };
            } catch (err) {
                console.error('Failed to initialize memos:', err);
                setError(err);
            }
        }
    }, [isResourcesLoaded]);

    if (error) {
        return <div>Error loading memos: {error.message}</div>;
    }
    
    return (
        <section id="main" className="container">
            <h2>{siteConfig('MEMOS_ENABLE')?siteConfig('MEMOS_NAME'):''}</h2>
            <blockquote id="tag-filter" className="filter">
                <div id="tags"></div>
            </blockquote>
            <div id="memos" className="memos">
                {!isResourcesLoaded && <div>Loading...</div>}
            </div>
        </section>
    );
};


export default BlogMemos;
