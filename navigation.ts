export function navigate(params: Record<string, string | null>) {
  var url = new URL(location.href);
  url.search = "";
  for (const k of Object.keys(params)) {
    url.searchParams.set(k, params[k]);
  }
  location.href = url.toString();
}
