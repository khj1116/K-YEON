
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="ad-container my-8 overflow-hidden flex justify-center">
      {/* 실제 애드센스 적용 시 아래 주석 해제 후 본인의 슬롯 번호 입력 */}
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={slot || "XXXXXXXXXX"}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
      */}
      <div className="ad-placeholder w-full max-w-4xl rounded-xl">
        <p>ADVERTISEMENT</p>
        <p className="text-[10px]">Google AdSense Space</p>
      </div>
    </div>
  );
};

export default AdBanner;
