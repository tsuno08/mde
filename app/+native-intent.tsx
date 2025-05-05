export function redirectSystemPath({ path }: { path: string }) {
  const baseNames = ["editor", "preview"];
  const allowed: RegExp[] = [];
  for (const name of baseNames) {
    allowed.push(new RegExp(`^/${name}$`));
    allowed.push(new RegExp(`^${name}$`));
    allowed.push(new RegExp(`^.*://${name}$`));
  }
  if (!allowed.some((regexp) => regexp.test(path))) {
    return "/editor";
  }
  return path;
}
