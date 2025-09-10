import { getHealthStatus } from '@/utils/monitoring';

const Health = () => {
  const healthData = getHealthStatus();

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <pre>{JSON.stringify(healthData, null, 2)}</pre>
    </div>
  );
};

export default Health;