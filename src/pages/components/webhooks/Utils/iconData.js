// src/icons/iconData.js
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShieldIcon from '@mui/icons-material/Shield';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import HttpsIcon from '@mui/icons-material/Https';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const MockIconData = [
  { 
    id: 1,
    GhostIcon: PeopleIcon, 
    CompleteIcon: CheckCircleIcon, 
    label: 'Stage 1 - User Info',
    description: 'Gathering user information...',
    tooltipTitle: 'Stage 1 of the process',
    pass: true,
    unknown: false,
    metrics: {
      usersProcessed: 1500,
      successRate: 98,
      errorRate: 2
    }
  },
  { 
    id: 2,
    GhostIcon: WorkIcon, 
    CompleteIcon: CheckCircleIcon, 
    label: 'Stage 2 - Processing Data',
    description: 'Processing data for analysis...',
    tooltipTitle: 'Stage 2 of the process',
    pass: false,
    unknown: true,
    metrics: {
      recordsProcessed: 500,
      failureRate: 20,
      retryAttempts: 50
    }
  },
  { 
    id: 3,
    GhostIcon: TimelineIcon, 
    CompleteIcon: CheckCircleIcon, 
    label: 'Stage 3 - Generating Report',
    description: 'Generating final reports...',
    tooltipTitle: 'Stage 3 of the process',
    pass: true,
    unknown: false,
    metrics: {
      reportsGenerated: 200,
      reportCompletionRate: 95,
      pendingReports: 5
    }
  }
];

export const additionalIcons = [
  {
    Icon: ShieldIcon,
    color: 'success.light',
    condition: (pass, unknown) => pass && !unknown
  },
  {
    Icon: GppMaybeIcon,
    color: 'success.light',
    condition: (pass, unknown) => pass && unknown
  },
  {
    Icon: HttpsIcon,
    color: 'success.light',
    condition: (pass, unknown) => !pass && !unknown
  },
  {
    Icon: LockOpenIcon,
    color: 'success.light',
    condition: (pass, unknown) => !pass && unknown
  }
];