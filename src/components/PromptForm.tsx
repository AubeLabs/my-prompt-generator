"use client";

import React, { useState, useEffect } from "react";
import { getRoleFromLocalStorage } from "../utils/localStorage";
import { FiCopy } from 'react-icons/fi';

const PromptForm = () => {
  const [requirements, setRequirements] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [byteCount, setByteCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = getRoleFromLocalStorage();
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleGeneratePrompt = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!requirements) {
        throw new Error('Requirements are required.');
      }

/*    API Routes (Route Handlers) 사용 시 
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, requirements }),
      });

      if (!response.ok) {
        // console.error(response);
        let errorDetails;
        try {
            const error = await response.json();
            console.error('Error:', error);
            errorDetails = error.message || error;
        } catch (jsonError) {
            console.error('Failed to parse error response:', jsonError);
            errorDetails = response.statusText;
        }
        throw new Error(`Failed to generate prompts: ${errorDetails}`);
      }

      const data = await response.json();
      setGeneratedPrompt(data.prompt); */

      // const prompt = `Role: ${role}\nRequirements: ${requirements}\nGenerate improved prompts for the provided role and requirements in English and original language of the requirements.`;
      const prompt = `Role: ${role}\nRequirements: ${requirements}\nGenerate a improved prompt for the provided role and requirements in English.`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_API_CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            // model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a prompt engineering assistant. Answer the prompt only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 16384,
        })
      });

      if (!response.ok) {
          console.error(response);
          let errorDetails;
          try {
              const data = await response.json();
              console.error('Error:', data);
              errorDetails = data.error.code + ': ' + data.error.message || data;
          } catch (jsonError) {
              console.error('Failed to parse error response:', jsonError);
              errorDetails = response.statusText;
          }
          throw new Error(`Failed to generate prompts: ${response.status} ${response.statusText} ${errorDetails}`);
      }

      const data = await response.json();
      const generatedPrompt = data.choices[0].message.content.trim();

      setGeneratedPrompt(generatedPrompt);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setRequirements(value);
    setByteCount(new TextEncoder().encode(value).length);
  };

  const handleCopyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt).then(() => {
        alert('프롬프트를 클립보드에 복사하였습니다.');
      }, (err) => {
        alert('클립보드 복사에 실패했습니다.');
      });
    }
  };

  return (
    <div className="p-4">
      <p className="mb-2">
        역할: (선택사항)
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="역할을 입력하세요 (예: 전문 디자이너)"
          className="w-full p-2 border rounded mb-2"
        />
      </p>
      <textarea
        value={requirements}
        onChange={handleRequirementsChange}
        placeholder="요구사항을 입력하세요"
        className="w-full p-auto border rounded mb-2 resize-y select-auto"
        maxLength={10000}
      />
      <p className="text-right text-sm text-gray-500 mb-2">
        {byteCount} / 10000 바이트
      </p>
      <button
        onClick={handleGeneratePrompt}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "생성 중..." : "프롬프트 생성"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {generatedPrompt && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">생성된 프롬프트</h3>
          <div
            className="w-full h-auto border rounded p-2 bg-white relative"
            style={{ whiteSpace: 'pre-wrap', userSelect: 'text' }}
          >
            <span>{generatedPrompt}</span>
            <button
              onClick={handleCopyToClipboard}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              <FiCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
