export const routes = {
    dashboard: "/app/dashboard",
    home: "/app/dashboard",
    fallback: "/",

    signin: "/auth/signin",
    signup: "/auth/signup",
    verify: "/auth/verify",
    maskdeconnexion: "/others/loggout",
    profile: "/auth/profile",

    // APP Invest
    notifications: "/app/notifications",
    activites: "/app/activities",
    statistics: "/app/statistics",
    // End invest

    users: '/app/listing/utilisateurs',
    labos: '/app/listing/laboratoires',
    marches: '/app/listing/marches',
    projects: '/app/listing/projects',
    pharmacies: '/app/listing/pharmacies',
    villages: '/app/listing/villages',
    cooperatives: '/app/listing/cooperatives',
    champs: '/app/listing/champs',
    products: '/app/listing/produits',
    configurations: '/app/configurations',
}

export const __routes = routes