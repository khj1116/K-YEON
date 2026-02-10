
import React from 'react';

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-sm my-12 text-sm leading-relaxed text-neutral-600">
    <h1 className="text-2xl font-bold mb-6 text-neutral-900">Privacy Policy (개인정보처리방침)</h1>
    <p className="mb-4">K-Kizuna는 사용자의 개인정보를 소중하게 생각하며, 관련 법령을 준수합니다.</p>
    <h2 className="text-lg font-bold mt-6 mb-2 text-neutral-800">1. 수집하는 데이터</h2>
    <p className="mb-4">본 서비스는 AI 분석을 위한 인터뷰 텍스트 및 시뮬레이션 설정값을 수집할 수 있으나, 이는 분석 결과 제공 후 별도 저장되지 않거나 익명화되어 관리됩니다.</p>
    <h2 className="text-lg font-bold mt-6 mb-2 text-neutral-800">2. 쿠키 및 광고</h2>
    <p className="mb-4">본 웹사이트는 Google AdSense를 사용하여 광고를 게재하며, 구글은 사용자의 방문 기록을 바탕으로 맞춤 광고를 제공하기 위해 쿠키를 사용합니다.</p>
    <h2 className="text-lg font-bold mt-6 mb-2 text-neutral-800">3. 문의</h2>
    <p>개인정보 관련 문의는 support@k-kizuna.com으로 연락주시기 바랍니다.</p>
  </div>
);

export const TermsOfUse: React.FC = () => (
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-sm my-12 text-sm leading-relaxed text-neutral-600">
    <h1 className="text-2xl font-bold mb-6 text-neutral-900">Terms of Use (이용약관)</h1>
    <p className="mb-4">K-Kizuna 서비스 이용을 환영합니다. 본 서비스를 이용함으로써 귀하는 다음 약관에 동의하게 됩니다.</p>
    <h2 className="text-lg font-bold mt-6 mb-2 text-neutral-800">1. 서비스의 목적</h2>
    <p className="mb-4">본 서비스는 한국-일본 간 문화 이해를 돕기 위한 AI 보조 도구를 제공합니다. 실제 결혼 및 연애에 대한 최종 책임은 사용자 본인에게 있습니다.</p>
    <h2 className="text-lg font-bold mt-6 mb-2 text-neutral-800">2. 금지 사항</h2>
    <p className="mb-4">타인의 정보를 도용하거나 서비스를 비정상적인 목적으로 이용하는 행위를 금지합니다.</p>
  </div>
);
