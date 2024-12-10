import React, { useEffect, useState } from 'react';
import { loadExternalResource } from '@/lib/utils';
import { siteConfig } from '@/lib/config'
import Script from 'next/script'

const MemosGallery = () => {
    const [isResourcesLoaded, setResourcesLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 加载资源
    useEffect(() => {
        const loadResources = async () => {
            try {
                console.log('Starting to load resources...');
                // 只加载必要的 CSS 资源
                await Promise.all([
                    loadExternalResource('/css/MemosGallery.css', 'css'),
                ]);
                console.log('Resources loaded successfully');
                setResourcesLoaded(true);
            } catch (err) {
                console.error('Failed to load resources:', err);
                setError(err);
            }
        };

        loadResources();
    }, []);

    // 初始化 Memos 配置
    useEffect(() => {
        if (isResourcesLoaded && typeof window !== 'undefined') {
            try {
                // 确保在 window 对象上创建 memosGalleryConfig
                window.memosGalleryConfig = {
                    urlHost: siteConfig('MEMOS_GET_HOST_URL') || "https://memos.lxip.top",
                    creatorId: siteConfig('MEMOS_GET_CREATOR_ID') || 1,
                    tag: siteConfig("MEMOS_GET_TAG") || "images",
                    public: siteConfig('MEMOS_GET_PUBLIC') || "PUBLIC",
                    onLoadComplete: () => setIsLoading(false),
                    onLoadError: (err) => {
                        setError(err);
                        setIsLoading(false);
                    }
                };

                // 初始化完配置后再加载 gallery.js
                const script = document.createElement('script');
                script.src = '/js/gallery/gallery.js';
                script.async = true;
                document.body.appendChild(script);

            } catch (err) {
                console.error('Failed to initialize memos gallery:', err);
                setError(err);
                setIsLoading(false);
            }
        }
    }, [isResourcesLoaded]);

    if (error) {
        return (
            <div className="error-container">
                <h3>Error loading memos gallery:</h3>
                <p>{error.message}</p>
                <pre>{error.stack}</pre>
            </div>
        );
    }

    return (
        <>
            {/* 使用 Next.js Script 组件加载基础依赖 */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
                strategy="beforeInteractive"
                onError={(e) => {
                    console.error('Failed to load jQuery:', e);
                    setError(new Error('Failed to load jQuery'));
                }}
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"
                strategy="afterInteractive"
                onError={(e) => {
                    console.error('Failed to load FancyBox:', e);
                    setError(new Error('Failed to load FancyBox'));
                }}
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css" />
            
            <section id="main" className="container">
                <blockquote id="tag-filter" className="filter">
                    <div id="tags"></div>
                </blockquote>
                
                {isLoading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        {/* <p>Loading gallery...</p> */}
                    </div>
                )}
                
                <div id="memos_gallery" className="memos_gallery">
                    <div id='gallery-photos' className="gallery-photos">
                        <div className="page"></div>
                    </div>
                </div>

                {/* <div id="back-to-top" style={{display: 'none'}}>
                    <i className="fas fa-arrow-up"></i>
                </div> */}
            </section>
        </>
    );
}

export default MemosGallery