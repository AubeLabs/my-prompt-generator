module.exports = {
  apps: [
    {
      name: 'my-prompt-generator',
      script: 'dist/main.js',
      instances: process.env.NODE_ENV === 'production' ? 'max' : 1, // 프로덕션에서는 모든 코어 사용, 개발에서는 1개 인스턴스 사용
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        PORT: process.env.PORT || 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        PORT: process.env.PORT || 3000,
      },
      watch: process.env.NODE_ENV !== 'production', // 프로덕션에서는 감시 비활성화
      //max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm Z', // 로그 타임스탬프 형식
      output: './logs/out.log', // 일반 로그 파일 경로
      error: './logs/error.log', // 에러 로그 파일 경로
      merge_logs: true, // 여러 인스턴스 로그 병합
    },
  ],
};
