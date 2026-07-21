/* Tiny module-level "unsaved changes" flag shared between the edit form and
   the admin nav, so in-app navigation can warn before leaving a dirty form.
   (beforeunload covers tab close / reload separately.) */

let dirty = false;

export const setDirty = (v: boolean) => {
  dirty = v;
};
export const isDirty = () => dirty;

export const CONFIRM_LEAVE = "Хадгалагдаагүй өөрчлөлт байна. Гарах уу?";

/** Returns true when navigation may proceed. */
export function confirmLeaveIfDirty(): boolean {
  if (!dirty) return true;
  const ok = window.confirm(CONFIRM_LEAVE);
  if (ok) dirty = false;
  return ok;
}
