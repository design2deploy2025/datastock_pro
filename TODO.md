# Inline Order Editing Implementation

## Plan Summary
- Add inline editing to OrdersTable for status, paymentStatus, source (dropdowns).
- Single-row edit mode via pencil icon.
- Update local state via callback.
- UI-only, no modal edit.

## Steps
- [x] 1. Update src/pages/dashboard/Orders.jsx: Add onOrderUpdate callback, pass to OrdersTable.
- [x] 2. Update src/components/dashboard/OrdersTable.jsx: Add Status, Payment, Source columns; editingRowId state; edit icon; inline inputs/dropdowns; save/cancel logic calling onOrderUpdate.
**Next: Step 3 - Test functionality.**
- [ ] 3. Test: Click edit, change fields, save → table updates.
- [ ] 4. Optional: Remove unused modal edit code if desired.
- [ ] 5. Complete task.

**Next: Implement step 1.**
