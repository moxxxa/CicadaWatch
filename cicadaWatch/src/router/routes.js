const LayoutConnected = () => import('layouts/LayoutConnected')
const Home = () => import('pages/Home')
const ClientService = () => import('components/ServiceClient/ServiceClient')
const About = () => import('components/About/About')
const LayoutPanier = () => import('layouts/LayoutPanier')
const Panier = () => import('components/Panier/Panier')
const ProductDetails = () => import('components/Product/Product')
const Contact = () => import('components/Contact/Contact')
const Address = () => import('components/Address/Address')
const routes = [
  { path: '', redirect: '/home' },
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
      },
      {
        path: '/detail-product',
        components: {
          default: ProductDetails
        }
      },
      {
        path: '/Contact',
        components: {
          default: Contact
        }
      },
      {
        path: '/Address',
        components: {
          default: Address
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
