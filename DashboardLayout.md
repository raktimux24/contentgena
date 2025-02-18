# Dashboard Layout & Wireframes

Below are the layouts and wireframes for the two primary Dashboard screens: the Overview Screen and the Content History/List View.

---

## 1. Dashboard Overview Screen

### Layout
- **Header (Persistent):**
  - **Logo/Brand Name** on the left.
  - **Navigation Menu:** Quick links to "Overview," "Content History," "Settings".
  - **User Icon/Dropdown:** For profile access and logout.
  - **Theme Toggle:** Option to switch dark/light mode.

- **Sidebar (Optional, if using a two-column layout):**
  - Navigation links similar to the header, providing quick access to different sections.

- **Main Content Area:**
  - **Recent Activity Snapshot:**
    - A card or section displaying the latest content generation results or activity summary.
  - **Content Generation Stats:**
    - Visual widgets (charts, counters, or cards) showing:
      - Number of content pieces generated.
      - Recent content types (blogs, tweet threads, LinkedIn posts).
      - Engagement or usage statistics.
  - **Quick Action CTA:**
    - A prominent button/link for "Generate New Content."

- **Footer:**
  - Minimal footer with support links or legal information.

### Wireframe

+———————————————————————————+
| [Logo]   [Overview] [Content History] [Settings]       [User Icon] [Theme]      |
+———————————————————————————+
|                                                                              /  |
|  [Sidebar]          |          Main Content Area                            |  |
|  - Overview         |  +———————————————+        |  |
|  - Content History  |  | Recent Activity Snapshot                  |        |  |
|  - Settings         |  |   - Latest generated content preview      |        |  |
|                     |  |   - Quick stats summary                   |        |  |
|                     |  +———————————————+        |  |
|                     |                                                    |  |
|                     |  +———————————————+        |  |
|                     |  | Content Generation Stats                    |        |  |
|                     |  |   [Card: Total Blogs Generated]             |        |  |
|                     |  |   [Card: Tweet Threads]   [Card: LinkedIn Posts]|      |  |
|                     |  +———————————————+        |  |
|                     |                                                    |  |
|                     |  [Generate New Content Button]                     |  |
+———————————————————————————+
|                                  [Footer]                                     |
+———————————————————————————+

---

## 2. Content History/List View

### Layout
- **Header (Persistent):**
  - Same header as the Overview screen for consistent navigation.

- **Main Content Area:**
  - **Search Bar & Filter Options:**
    - A top section with an input field for search and dropdowns or filter buttons for content type/date.
  - **List/Grid of Content Items:**
    - Each item displays:
      - Title or a brief description.
      - Date/time stamp.
      - Content type icon (blog, tweet thread, LinkedIn post).
      - Action buttons (e.g., view details, copy, delete).
  - **Empty State View:**
    - If no content exists:
      - Friendly message ("No content generated yet!")
      - CTA button to "Generate New Content."

- **Pagination or Infinite Scroll (if necessary):**
  - Navigation controls to move through pages of content if the list is long.

### Wireframe

+———————————————————————————+
| [Logo]   [Overview] [Content History] [Settings]       [User Icon] [Theme]      |
+———————————————————————————+
|                             Content History/List View                           |
+———————————————————————————+
|  [Search Bar: “Search your content…”]   [Filter: All | Blogs | Tweets | LinkedIn]|
+———————————————————————————+

[Content Item Card]


—————————————————–
[Content Item Card]
—————————————————–


—————————————————–

(If no items exist)
+———————————————————––+


+———————————————————––+
+———————————————————————————+
[Footer]
+———————————————————————————+

---

These layouts and wireframes provide a clear structure for the Dashboard screens, ensuring that users can quickly access their recent activities, view detailed content history, and easily navigate through the app's primary functionalities while maintaining a consistent Neobrutalist aesthetic.