// frontend/src/admin.ts

import { fetchAndRenderUsers } from './admin-users';
import { fetchAndRenderCategories } from './admin-categories';
import { addCategories } from './admin-categories';
import { setNavigation } from './admin-navigation';


document.addEventListener('DOMContentLoaded', () => {
    setNavigation();
});
