export default function sitemap() {
  let routes = [
    "",
    "/contact",
    "/legal",
    "/privacy",
    "/onboard",
    "/guides/comment-faire-un-cv-suisse",
  ].map((route) => ({
    url: `https://swisscvbuilder.ch${route}`,
    lastModified: new Date(),
  }));

  return routes;
}
