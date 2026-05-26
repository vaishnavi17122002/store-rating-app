# TODO - Role-based auth + security hardening

## Step 1: Inspect existing code paths
- ✅ Confirmed backend routes did not use JWT.

## Step 2: Implement backend auth middleware
- ✅ Added `backend/middleware/authMiddleware.js` with `verifyToken` + `requireRole`.

## Step 3: Protect backend routes per requirements
- ✅ `/api/admin/dashboard` → ADMIN only
- ✅ `/api/stores` POST → ADMIN only
- ✅ `/api/ratings` POST → JWT required
- ✅ `/api/users` GET → ADMIN only
- ✅ `/api/users/update-password` → JWT required (identity from token)
- ✅ `/api/owner/*` → STORE_OWNER only (no trust on URL email)

## Step 4: Backend input validation
- ✅ rating range enforced (integer 1–5)
- ✅ password update enforced with same password rules as signup

## Step 5: Frontend updates
- ✅ Updated Admin/Dashboard/OwnerDashboard axios calls to send `Authorization: Bearer <token>`.

## Step 6: Verify role routing and remove trust on localStorage.user.role
- ✅ Backend now uses JWT role/email; frontend redirects still exist but backend is the source of truth.

## Step 7: Run app and basic manual tests
- ⛔ Pending:
  - Test unauthorized calls return 401/403
  - Test admin can add stores/users
  - Test normal user can rate/update only their own rating
  - Test store owner dashboard only for authenticated owner

