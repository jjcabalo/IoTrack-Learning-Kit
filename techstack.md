# Tech Stack & Project Structure

## Tech Stack
*(Note: These are standard recommendations for this type of project and can be adjusted by the AI based on specific preferences)*
* **Framework**: React / Next.js (for optimized routing and component structure)
* **Styling**: Tailwind CSS (highly recommended for rapid UI development and effortless light/dark mode implementation)
* **Icons**: Lucide React or FontAwesome
* **State Management**: React Context (sufficient for managing simple states like theme and sidebar toggle)

## Project Architecture
The project should utilize a modular, component-based architecture for maintainability.

### Key Components
1. **`Header`**: The top navigation bar.
2. **`Sidebar`**: The left navigation menu containing links to all 8 pages.
3. **`Layout`**: A wrapper component that includes both the `Header` and `Sidebar`, rendering the specific page content in the main content area.

### Folder and Page Structure
Below is the recommended structure ensuring proper arrangement of pages and components:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Persistent top navigation (Branding, Theme Toggle)
│   │   ├── Sidebar.jsx        # Left bar navigation (Links to modules and assessments)
│   │   └── MainLayout.jsx     # Wrapper component combining Header, Sidebar, and children
│   ├── ui/                    # Reusable UI components (buttons, cards, form inputs)
│   └── ...
├── pages/                     # (Or app/ if using Next.js App Router)
│   ├── index.jsx              # Landing / Redirects to Pre-assessment
│   ├── pre-assessment.jsx     # Pre-assessment page
│   ├── module-1.jsx           # Module 1 content
│   ├── module-2.jsx           # Module 2 content
│   ├── module-3.jsx           # Module 3 content
│   ├── module-4.jsx           # Module 4 content
│   ├── module-5.jsx           # Module 5 content
│   ├── module-6.jsx           # Module 6 content
│   └── post-assessment.jsx    # Post-assessment page
├── styles/
│   └── globals.css            # Global styles, Tailwind directives, theme variables
└── utils/                     # Helper functions
```
