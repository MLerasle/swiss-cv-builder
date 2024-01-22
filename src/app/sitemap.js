export default function sitemap() {
  let routes = ["", "/contact", "/legal", "/privacy", "/onboard"].map(
    (route) => ({
      url: `https://swisscvbuilder.ch${route}`,
      lastModified: new Date(),
    })
  );

  return routes;
}
