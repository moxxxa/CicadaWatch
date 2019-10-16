const LayoutConnected = () => import('layouts/LayoutConnected')
const Home = () => import('pages/Home')
const ClientService = () => import('components/ServiceClient/ServiceClient')
const About = () => import('components/About/About')
const LayoutPanier = () => import('layouts/LayoutPanier')
const Panier = () => import('components/Panier/Panier')

const routes = [
  {
    path: '/home',
    component: LayoutConnected,
    children: [
      {
        path: '',
        components: {
          default: Home
        }
      },
      {
        path: '/about',
        components: {
          default: About
        }
      },
      {
        path: '/clientService',
        components: {
          default: ClientService
        }
      }
    ]
  },
  {
    path: '/home/panier',
    component: LayoutPanier,
    children: [
      {
        path: '',
        components: {
          default: Panier
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
