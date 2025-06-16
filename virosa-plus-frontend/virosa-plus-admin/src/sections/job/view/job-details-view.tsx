import type { IJobItem } from 'src/types/job';

import { useState, useCallback } from 'react';
import { useTabs } from 'minimal-shared/hooks';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { JOB_DETAILS_TABS, JOB_PUBLISH_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';

import { JobDetailsToolbar } from '../job-details-toolbar';
import { JobDetailsContent } from '../job-details-content';
import { JobDetailsCandidates } from '../job-details-candidates';

// ----------------------------------------------------------------------

type Props = {
  job?: IJobItem;
};

export function JobDetailsView({ job }: Props) {
  const tabs = useTabs('content');

  const [publish, setPublish] = useState(job?.publish);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const renderToolbar = () => (
    <JobDetailsToolbar
      backHref={paths.dashboard.job.root}
      editHref={paths.dashboard.job.edit(`${job?.id}`)}
      liveHref="#"
      publish={publish || ''}
      onChangePublish={handleChangePublish}
      publishOptions={JOB_PUBLISH_OPTIONS}
    />
  );

  const renderTabs = () => (
    <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
      {JOB_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'candidates' ? (
              <Label variant="filled">{job?.candidates.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <DashboardContent>
      {renderToolbar()}

      {renderTabs()}
      {tabs.value === 'content' && <JobDetailsContent job={job} />}
      {tabs.value === 'candidates' && <JobDetailsCandidates candidates={job?.candidates ?? []} />}
    </DashboardContent>
  );
}
