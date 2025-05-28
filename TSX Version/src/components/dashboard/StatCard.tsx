import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary-600/10 text-primary-600 border-primary-600/20',
    secondary: 'bg-secondary-600/10 text-secondary-600 border-secondary-600/20',
    success: 'bg-success-600/10 text-success-600 border-success-600/20',
    warning: 'bg-warning-600/10 text-warning-600 border-warning-600/20',
    error: 'bg-error-600/10 text-error-600 border-error-600/20',
  };

  const iconColorClasses = {
    primary: 'bg-primary-600/20 text-primary-600',
    secondary: 'bg-secondary-600/20 text-secondary-600',
    success: 'bg-success-600/20 text-success-600',
    warning: 'bg-warning-600/20 text-warning-600',
    error: 'bg-error-600/20 text-error-600',
  };

  const changeColorClasses = {
    up: 'text-success-500',
    down: 'text-error-500',
    neutral: 'text-gray-500',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={classNames(
        'rounded-lg border p-4 shadow-sm',
        colorClasses[color]
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <p className={classNames('ml-2 text-xs', changeColorClasses[change.direction])}>
                {change.direction === 'up' && '↑'}
                {change.direction === 'down' && '↓'}
                {change.value}%
              </p>
            )}
          </div>
        </div>
        <div className={classNames(
          'rounded-md p-2',
          iconColorClasses[color]
        )}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;