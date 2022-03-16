const url = new URL(location.href);
export const parameters: Record<string, string | null> = {};
for (const key of url.searchParams.keys()) {
  parameters[key] = url.searchParams.get(key);
}
if (!parameters.view) {
  location.href = "?view=index";
}
