import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const StatsGrid = ({ cards = [], onCardClick }) => {
  const handleCardClick = (cardId) => {
    if (onCardClick) {
      onCardClick(cardId);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper function to get trend styling
  const getTrendStyles = (trend) => {
    if (trend === 'up') {
      return {
        bgColor: 'bg-green-100/80 text-green-800 group-hover:bg-green-200',
        icon: <TrendingUp className="h-4 w-4" />
      };
    }
    
    if (trend === 'down') {
      return {
        bgColor: 'bg-red-100/80 text-red-800 group-hover:bg-red-200',
        icon: <TrendingDown className="h-4 w-4" />
      };
    }
    
    return {
      bgColor: 'bg-gray-100/80 text-gray-800 group-hover:bg-gray-200',
      icon: <Activity className="h-4 w-4" />
    };
  };

  // Helper function to handle animation delay
  const getAnimationDelay = (index) => `${index * 100}ms`;

  // Helper function to handle mouse events
  const handleMouseEnter = (e) => {
    e.currentTarget.classList.add('scale-105', 'shadow-xl');
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove('scale-105', 'shadow-xl');
  };

  const handleFocus = (e) => {
    e.currentTarget.classList.add('ring-4', 'ring-blue-200');
  };

  const handleBlur = (e) => {
    e.currentTarget.classList.remove('ring-4', 'ring-blue-200');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const trendStyles = getTrendStyles(card.trend);
        const animationDelay = getAnimationDelay(index);
        const cardKey = card.id || `card-${index}`;

        return (
          <button
            key={cardKey}
            type="button"
            onClick={() => handleCardClick(card.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              relative overflow-hidden rounded-2xl p-6 
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-xl 
              active:scale-95 active:shadow-lg
              focus:outline-none focus:ring-4 focus:ring-blue-500/30
              ${card.bgColor || 'bg-white'}
              group
              animate-fade-in-up
            `}
            style={{ animationDelay }}
            aria-label={`Go to ${card.title}`}
          >
            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              {/* Icon and Trend */}
              <div className="flex items-start justify-between mb-4">
                <div className={`
                  inline-flex items-center justify-center 
                  p-3 rounded-2xl
                  transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-3
                  ${card.iconBgColor || 'bg-gray-100'}
                  shadow-sm
                `}>
                  {card.icon && (
                    <card.icon className={`
                      h-6 w-6 transition-all
                      group-hover:h-7 group-hover:w-7
                      ${card.textColor || 'text-gray-600'}
                    `} />
                  )}
                </div>
                
                {card.change !== undefined && (
                  <span className={`
                    flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                    transition-all
                    ${trendStyles.bgColor}
                    group-hover:scale-105
                  `}>
                    {trendStyles.icon}
                    {card.change}%
                  </span>
                )}
              </div>
              
              {/* Value and Title */}
              <div className="mb-2">
                <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                  {card.value || '0'}
                </p>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  {card.title || 'Untitled'}
                </p>
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-500 opacity-90 group-hover:opacity-100 transition-opacity">
                {card.description || 'No description'}
              </p>
              
              {/* Progress Bar */}
              {card.progress !== undefined && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Progress</span>
                    <span className="font-medium">{card.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200/80 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(card.progress)}`}
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Hover Action */}
              <div className="
                absolute bottom-6 right-6 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300
                group-hover:translate-x-0 translate-x-4
              ">
                <div className="flex items-center gap-1 text-sm text-gray-500 group-hover:text-gray-700">
                  <span>View</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            
            {/* Corner Decoration */}
            {card.icon && (
              <div className={`
                absolute top-0 right-0 
                w-20 h-20 
                opacity-5 group-hover:opacity-10
                transition-opacity duration-300
                ${card.textColor || 'text-gray-400'}
              `}>
                <card.icon className="h-full w-full" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

StatsGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      bgColor: PropTypes.string,
      textColor: PropTypes.string,
      iconBgColor: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      change: PropTypes.number,
      progress: PropTypes.number,
      trend: PropTypes.oneOf(['up', 'down', 'stable'])
    })
  ).isRequired,
  onCardClick: PropTypes.func
};

StatsGrid.defaultProps = {
  cards: [],
  onCardClick: () => {},
  isRequired: true
};

export default StatsGrid;