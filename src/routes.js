// import Page404 from './views/404'
// import Blank from './views/Blank'

// DASHBOARD
import Dashboard from './views/Dashboard'

// PROJECT
// import Project from 'views/Project'
// import ListProject from 'views/Project/ListProject'
// import SalesFunnel from 'views/Project/ListProject/components/SalesFunnel'
// import MarkAsActual from 'views/Project/ListProject/components/MarkAsActual'
// import PeopleAssignment from 'views/Project/PeopleAssignment'
// import ProjectProfile from 'views/Project/ProjectProfile'

// REALIZATION
// import CostIndex from 'views/Realization/Cost'
// import VendorIndex from 'views/Realization/Vendor'
// import AddEditVendorRealization from 'views/Realization/Vendor/components/AddEditVendorRealization'
// import BillingIndex from 'views/Realization/Billing'
// import AddEditBillingRealization from 'views/Realization/Billing/components/AddEditBillingRealization'
// import AddEditCostRealization from 'views/Realization/Cost/components/AddEditCostRealization'

// STREAMING
// import RevenueStreamIndex from 'views/Streaming/RevenueStream'
// import AddEditRevenueStream from 'views/Streaming/RevenueStream/components/AddEditRevenueStream'
// import CostStreamIndex from 'views/Streaming/CostStream'
// import AddEditCostStream from 'views/Streaming/CostStream/components/AddEditCostStream'
// import UserManagement from 'views/UserManagement'
// import Employee from 'views/Master/Employee'
// import Rate from 'views/Master/Rate'
// import AddEditRate from 'views/Master/Rate/components/AddEditRate'
// import AddEditEmployee from 'views/Master/Employee/components/AddEditEmployee'
// import Customer from 'views/Master/Customer'
// import AddEditCustomer from 'views/Master/Customer/components/AddEditCustomer'
// import Referensi from 'views/Master/Referensi'
// import AddEditReferensi from 'views/Master/Referensi/components/AddEditReferensi'

const routes = [
    {
        path: '/', // the url
        component: Dashboard, // view rendered
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },

    /* ===== MENU PROJECT ===== */
    // LIST PROJECT
    // {
    //     path: '/add-project',
    //     component: SalesFunnel,
    // },
    // {
    //     path: '/edit-project',
    //     component: SalesFunnel,
    // },
    // {
    //     path: '/mark-actual',
    //     component: MarkAsActual,
    // },
    // {
    //     path: '/list-project',
    //     component: ListProject,
    // },

    // PEOPLE ASSIGNMENT
    // {
    //     path: '/people-assignment',
    //     component: PeopleAssignment,
    // },

    // PROJECT PROFILE
    // {
    //     path: '/project-profile',
    //     component: ProjectProfile,
    // },

    /* ===== MENU REALIZATION ===== */
    // COST
    // {
    //     path: '/cost-index',
    //     component: CostIndex,
    // },

    // VENDOR
    // {
    //     path: '/vendor-index',
    //     component: VendorIndex,
    // },
    // {
    //     path: '/edit-vendor-realization',
    //     component: AddEditVendorRealization,
    // },
    // {
    //     path: '/add-vendor-realization',
    //     component: AddEditVendorRealization,
    // },

    // BILLING
    // {
    //     path: '/billing-index',
    //     component: BillingIndex,
    // },
    // {
    //     path: '/edit-billing-realization',
    //     component: AddEditBillingRealization,
    // },
    // {
    //     path: '/add-billing-realization',
    //     component: AddEditBillingRealization,
    // },
    // {
    //     path: '/edit-cost-realization',
    //     component: AddEditCostRealization,
    // },

    /* ===== MENU STREAMING ===== */
    // REVENUE STREAM
    // {
    //     path: '/revenue-stream',
    //     component: RevenueStreamIndex,
    // },
    // {
    //     path: '/entry-data-revenue-stream',
    //     component: AddEditRevenueStream,
    // },
    // {
    //     path: '/cost-stream',
    //     component: CostStreamIndex,
    // },
    // {
    //     path: '/edit-cost-stream',
    //     component: AddEditCostStream,
    // },

    // MASTER
    // {
    //     path: '/employee-master',
    //     component: Employee,
    // },
    // {
    //     path: '/add-employee-master',
    //     component: AddEditEmployee,
    // },
    // {
    //     path: '/rate-master',
    //     component: Rate,
    // },
    // {
    //     path: '/add-rate-master',
    //     component: AddEditRate,
    // },
    // {
    //     path: '/referensi-master',
    //     component: Referensi,
    // },
    // {
    //     path: '/add-referensi-master',
    //     component: AddEditReferensi,
    // },
    // {
    //     path: '/customer-master',
    //     component: Customer,
    // },
    // {
    //     path: '/add-customer-master',
    //     component: AddEditCustomer,
    // },
    // {
    //     path: '/edit-customer-master',
    //     component: AddEditCustomer,
    // },

    // USER MANAGEMENT
    // {
    //     path: '/user-management',
    //     component: UserManagement,
    // },
    // {
    //     path: '/404',
    //     component: Page404,
    // },
    // {
    //     path: '/blank',
    //     component: Blank,
    // },
]

export default routes
