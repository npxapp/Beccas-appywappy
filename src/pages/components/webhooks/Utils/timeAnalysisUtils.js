import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        bgcolor: 'background.paper',
        p: 1,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1
      }}>
        <Typography variant="body2">
          {`${label}: ${payload[0].value} repositories`}
        </Typography>
      </Box>
    );
  }
  return null;
};

export const renderTimeSeriesChart = (data, title, theme) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h6" gutterBottom align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" name="Repositories">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary[index % 2 ? 300 : 500]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const renderLineChart = (data, title) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottomRight', offset: -5 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const renderPieChart = (data, title) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="day"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label={(entry) => `${entry.day}: ${entry.count}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 ? "#0088FE" : "#00C49F"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const renderScatterPlot = (data, title, dateType, totalData, theme) => {
  const validData = data.map((entry) => {
    const date = new Date(entry.yearMonth);
    const timestamp = date.getTime();
    return {
      stageDate: timestamp,
      totalCount: entry.count,
      name: entry.name,
    };
  });

  return (
    <Box sx={{ width: '100%', height: 300, mb: 2 }}>
      <Typography variant="h6" gutterBottom align="center">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="stageDate"
            name="Stage Date"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            type="number"
            dataKey="totalCount"
            name="Total Count"
          />
          <ZAxis type="number" dataKey="totalCount" range={[50, 400]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Scatter data={validData} fill={theme.palette.primary.main} />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

// timeAnalysisUtils.js
export const calculateTimeMetrics = (repositories, dateType) => {
  if (!repositories?.length || !dateType) return {};

  const hourCounts = new Array(24).fill(0);
  const dayCounts = new Array(7).fill(0);
  const weekCounts = {};
  const yearCounts = {};

  repositories.forEach(repo => {
    if (!repo[dateType]) return;

    try {
      const date = new Date(repo[dateType]);

      // Hour analysis
      const hour = date.getHours();
      hourCounts[hour]++;

      // Day analysis
      const day = date.getDay();
      dayCounts[day]++;

      // Week analysis
      const weekNum = getWeekNumber(date);
      const weekKey = `${date.getFullYear()}-W${weekNum}`;
      weekCounts[weekKey] = (weekCounts[weekKey] || 0) + 1;

      // Year analysis
      const year = date.getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    } catch (error) {
      console.warn('Error processing date:', error);
    }
  });

  // Find most active periods
  const mostActiveHour = hourCounts.indexOf(Math.max(...hourCounts));
  const mostActiveDay = dayCounts.indexOf(Math.max(...dayCounts));
  const mostActiveWeek = Object.entries(weekCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0];
  const mostActiveYear = Object.entries(yearCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  // Calculate totals
  const totalByHour = hourCounts.reduce((a, b) => a + b, 0);
  const totalByDay = dayCounts.reduce((a, b) => a + b, 0);
  const totalByWeek = Object.values(weekCounts).reduce((a, b) => a + b, 0);
  const totalByYear = Object.values(yearCounts).reduce((a, b) => a + b, 0);

  return {
    mostActive: {
      hour: {
        value: mostActiveHour,
        formatted: `${mostActiveHour}:00`,
        count: hourCounts[mostActiveHour]
      },
      day: {
        value: mostActiveDay,
        formatted: getDayName(mostActiveDay),
        count: dayCounts[mostActiveDay]
      },
      week: {
        value: mostActiveWeek,
        formatted: formatWeek(mostActiveWeek),
        count: weekCounts[mostActiveWeek]
      },
      year: {
        value: mostActiveYear,
        formatted: mostActiveYear,
        count: yearCounts[mostActiveYear]
      }
    },
    totals: {
      byHour: totalByHour,
      byDay: totalByDay,
      byWeek: totalByWeek,
      byYear: totalByYear
    }
  };
};

const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

const getDayName = (day) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
};

const formatWeek = (weekString) => {
  if (!weekString) return '';
  const [year, week] = weekString.split('-W');
  return `Week ${week}, ${year}`;
};

