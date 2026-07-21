/* Fire-and-forget toast API. The host lives in the admin layout (which
   survives route-param remounts), so toasts outlive form re-renders caused
   by server-action responses. */

export type ToastDetail = { msg: string; error?: boolean };

export function toast(msg: string, error = false) {
  window.dispatchEvent(
    new CustomEvent<ToastDetail>("admin-toast", { detail: { msg, error } })
  );
}
