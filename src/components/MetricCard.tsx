import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  previousValue: number;
  format: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  format,
}) => {
  const formattedValue = (() => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 2,
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('ru-RU').format(value);
      case 'decimal':
        return value.toFixed(2);
      default:
        return value.toString();
    }
  })();

  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'success.main' : 'error.main';

  return (
    <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <CardContent sx={{ width: '100%' }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {formattedValue}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: changeColor }}
          >
            {change}% {isIncrease ? 'рост' : 'падение'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;