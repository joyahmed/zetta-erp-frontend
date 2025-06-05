import accountsRoutes from './accountsRoutes';
import crmRoutes from './crmRoutes';
import hrmRoutes from './hrmRotues';
import mainRoutes from './mainRoutes';

import settingRoutes from './settingRoute';

const routes = {
	...mainRoutes,
	...hrmRoutes,
	...crmRoutes,
	...accountsRoutes,
	...settingRoutes
};

export default routes;
