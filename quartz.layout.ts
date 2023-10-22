import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.Search(),
    Component.DesktopOnly(Component.Explorer({
        sortFn: (a, b) => {
            if ((!a.file && !b.file) || (a.file && b.file)) {
              // Remove non-alphanumeric except for spaces and dashes
              return a.displayName.replace(/[^\w\s\-]/gi, '').localeCompare(b.displayName.replace(/[^\w\s\-]/gi, ''))
            }
            if (a.file && !b.file) {
              return -1
            } else {
              return 1
            }
          },
    })),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Graph(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
  ],
  right: [],
}
