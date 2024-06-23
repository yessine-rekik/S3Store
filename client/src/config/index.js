const configVariables = {
  ENV: process.env.NEXT_PUBLIC_ENV || 'local',
  BASE_URL: process.env.NEXT_PUBLIC_ENV === 'local' ?  'http://localhost:4000/api' : '/api'
};

export default configVariables;
