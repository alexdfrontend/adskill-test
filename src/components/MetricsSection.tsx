import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Alert, Skeleton } from '@mui/material';
import MetricCard from './MetricCard';
import type { RootState } from '../store';
import type { Metric } from '../types/types';

const MetricsSection: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.metrics);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data) {
    return <Alert severity="warning">No metrics data available</Alert>;
  }

  const metrics: Array<Metric> = [
    {
      title: 'Расходы',
      value: data.expenses.value,
      change: data.expenses.change,
      changeType: data.expenses.changeType,
      previousValue: data.expenses.previousValue,
      format: 'currency',
    },
    {
      title: 'Клики',
      value: data.clicks.value,
      change: data.clicks.change,
      changeType: data.clicks.changeType,
      previousValue: data.clicks.previousValue,
      format: 'number',
    },
    {
      title: 'CPC',
      value: data.cpc.value,
      change: data.cpc.change,
      changeType: data.cpc.changeType,
      previousValue: data.cpc.previousValue,
      format: 'decimal',
    },
    {
      title: 'CPA',
      value: data.cpa.value,
      change: data.cpa.change,
      changeType: data.cpa.changeType,
      previousValue: data.cpa.previousValue,
      format: 'decimal',
    },
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.title}>
          <MetricCard
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            previousValue={metric.previousValue}
            format={metric.format}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsSection;