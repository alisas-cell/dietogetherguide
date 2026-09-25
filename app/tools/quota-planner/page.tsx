import { PlanningPage, planningData } from '../../../components/tools/PlanningPage';
import { buildGuideMetadata } from '../../../lib/seo/metadata';
export const metadata=buildGuideMetadata(planningData('quota-planner'));
export default function Page(){return <PlanningPage kind="quota-planner"/>;}
