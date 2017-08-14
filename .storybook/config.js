import { configure } from '@storybook/react';

import '../static/assets/css/sdhacks.min.css';

function loadStories() {
  require('./stories/admin/auth.js');
  require('./stories/admin/index.js');
  require('./stories/admin/resume.js');

  require('./stories/apply/index.js');

  require('./stories/user/index.js');
}

configure(loadStories, module);
