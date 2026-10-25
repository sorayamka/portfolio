# SEO implementation — 2026-10-25

## Confirmed findings and fixes

| Priority | Finding | Change | Verification |
| --- | --- | --- | --- |
| Critical | Canonical and Open Graph referred to an unrelated domain | Absolute production URLs for every public page | Inspect exported and live HTML |
| High | English content depended on a local browser toggle | Six statically rendered `/en/` pages, route-based language, reciprocal hreflang | English copy present without JavaScript; RU/EN navigation test |
| High | No sitemap | Twelve RU/EN URLs with language alternates | Validate `sitemap.xml` and HTTP status of each URL |
| Medium | Missing social sharing image | 1200×630 JPEG, Open Graph and Twitter metadata | Preview image URL returns an image |
| Medium | Missing entity and breadcrumb markup | Person, WebSite and case BreadcrumbList JSON-LD | Parse JSON-LD and check against visible content |
| Medium | No semantic homepage H1 | Accessible descriptive H1 | Inspect rendered heading structure |
| Medium | Exported English documents inherited Russian HTML language | Finalize static English HTML with `lang=en` | Inspect exported HTML and browser language |

## Scope and limitations

- Methodology: technical, on-page, content, schema, international and performance checks from AgricIDaniel/claude-seo. No plugin runtime installation or paid APIs used.
- This is a personal portfolio, not an e-commerce store. No fabricated ratings, business address, client results or course Product markup were added. The Sora conversation remains labelled as a demonstration.
- GitHub Pages hosts this project below `/portfolio/`. Its robots file is served at `/portfolio/robots.txt`, not the origin root `/robots.txt`; crawlers only treat the origin-root robots file as authoritative. The project file alone does not control origin-wide crawler access. Sitemap can be submitted directly to Search Console.
- No Search Console ownership or field CrUX data was available. Indexing, ranking gains and real-user Core Web Vitals are not confirmed by a successful build.
- Lighthouse before/after performance scoring is still a follow-up; no performance score is claimed in this report. Previous media and request-loading improvements are independent of this SEO deployment.
- Validate structured data with Schema.org Validator; search enhancements depend on Google eligibility and are not guaranteed.

## Next measurements

1. Verify domain ownership in Search Console and submit `https://sorayamka.github.io/portfolio/sitemap.xml`.
2. Inspect a RU and an EN URL after indexing; check selected canonical and language discovery.
3. Run repeatable mobile Lighthouse measurements and use field data when traffic is sufficient. Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile.
4. Consider a dedicated domain: it allows control of origin-root robots, cleaner URLs and an independent site identity.
