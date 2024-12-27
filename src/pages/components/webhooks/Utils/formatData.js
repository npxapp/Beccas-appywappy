import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const formatDataStage1 = (data) => {
  const stage1Data = data[1]; // Extract the object with id 1

  return {
    id: 1,
    GhostIcon: PeopleIcon,
    CompleteIcon: CheckCircleIcon,
    label: stage1Data.label,
    description: stage1Data.description,
    tooltipTitle: stage1Data.tooltipTitle,
    pass: stage1Data.pass,
    unknown: stage1Data.unknown,
    metrics: {
      usersProcessed: stage1Data.metrics.activeContributors,  // Map backend key to frontend key
      successRate: stage1Data.metrics.issueResolutionRate,   // Map backend key to frontend key
      errorRate: stage1Data.metrics.communityGrowth,         // Map backend key to frontend key
    },
  };
};

export const formatDataStage2 = (data) => {
  const stage2Data = data[2]; // Extract the object with id 2

  return {
    id: 2,
    GhostIcon: WorkIcon,
    CompleteIcon: CheckCircleIcon,
    label: stage2Data.label,
    description: stage2Data.description,
    tooltipTitle: stage2Data.tooltipTitle,
    pass: stage2Data.pass,
    unknown: stage2Data.unknown,
    metrics: {
      recordsProcessed: stage2Data.metrics.monthlyDownloads, // Map backend key to frontend key
      failureRate: stage2Data.metrics.activeVersions,        // Map backend key to frontend key
      retryAttempts: stage2Data.metrics.dependencyCount,     // Map backend key to frontend key
    },
  };
};

export const formatDataStage3 = (data) => {
  const stage3Data = data[3]; // Extract the object with id 3

  return {
    id: 3,
    GhostIcon: TimelineIcon,
    CompleteIcon: CheckCircleIcon,
    label: stage3Data.label,
    description: stage3Data.description,
    tooltipTitle: stage3Data.tooltipTitle,
    pass: stage3Data.pass,
    unknown: stage3Data.unknown,
    metrics: {
      reportsGenerated: stage3Data.metrics.totalRepositories,    // Map backend key to frontend key
      reportCompletionRate: stage3Data.metrics.averageStars,     // Map backend key to frontend key
      pendingReports: stage3Data.metrics.topProjectStars,        // Map backend key to frontend key
    },
  };
};