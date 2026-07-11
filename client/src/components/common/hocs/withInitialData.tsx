import React from 'react';

// Simplified HOC wrappers: the actual database initialization, check, fetching, and hydration
// is handled cleanly by the dbInitService during store creation.
const createDataWrapper = () => <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const ComponentWithData: React.FC<P> = (props) => {
    return <WrappedComponent {...props} />;
  };
  return React.memo(ComponentWithData);
};

export const withLearningData = createDataWrapper();
export const withEngagementData = createDataWrapper();
