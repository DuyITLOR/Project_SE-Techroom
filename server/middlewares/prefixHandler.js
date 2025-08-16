
export function handleByPrefix(req, res, next) {
    req.isAdmin = req.baseUrl.startsWith('/api/admin');
    req.isCore = req.baseUrl.startsWith('/api/core');
    next();
}
