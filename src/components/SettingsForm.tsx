'use client'

import React, { useState, useEffect } from 'react';
import { saveRoleToLocalStorage, getRoleFromLocalStorage } from '../utils/localStorage';
import { useRouter } from 'next/navigation';

const SettingsForm = () => {
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const savedRole = getRoleFromLocalStorage();
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleSave = () => {
    saveRoleToLocalStorage(role);
    alert('역할이 저장되었습니다.');
    router.push('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">역할 설정</h2>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="역할을 입력하세요 (예: 전문 디자이너)"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white p-2 rounded"
      >
        저장
      </button>
    </div>
  );
};

export default SettingsForm;