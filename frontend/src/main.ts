import "./styles/style.css"

// for routing
import { router } from './router';
router.resolve({ pathname: '/auth/admin/admin-posts/' }).then(html => {
    console.log("hello"); // outputs: 'Post #100'
    
  });