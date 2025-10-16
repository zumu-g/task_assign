# **Product Requirements Document: FlowAI**

| **Document Title** | FlowAI: Intelligent Task Orchestrator |
| :--- | :--- |
| **Version** | 1.0 |
| **Date** | 16 October 2025 |
| **Status** | Draft for Review |
| **Author** | Gemini |

<br>

-----

### <span style="color:#0052FF;">**1. Vision & Introduction**</span>

**FlowAI** is a minimalist, intelligent project management tool designed to eliminate administrative friction and restore focus to meaningful work. It transforms unstructured ideas into actionable, organized tasks through a seamless AI-powered workflow. By automating the creation, enrichment, and assignment of tasks, FlowAI allows teams to move from concept to execution with unprecedented speed and clarity. Our north star is to create a tool so intuitive and efficient that it feels like a natural extension of the team's thought process.

-----

### <span style="color:#0052FF;">**2. Goals & Objectives**</span>

| Goal Category | Objective | Success Metric |
| :--- | :--- | :--- |
| **User Experience** | Reduce time spent on manual task creation and organization. | Decrease average time from "inbox item created" to "task assigned" by 70%. |
| **Product Adoption** | Create a "magical" onboarding experience that demonstrates immediate value. | 40% of new users process their first inbox item via AI within their first session. |
| **Business** | Establish a foundation for a premium, feature-rich productivity suite. | Achieve 1,000 Daily Active Users (DAU) within 3 months of launch. |
| **System** | Ensure a fast, reliable, and responsive user interface across all views. | AI processing time under 3 seconds per item; view-switching latency under 200ms. |

-----

### <span style="color:#0052FF;">**3. User Personas**</span>

  * **Priya, the Project Manager:** Manages a team of 8. She is overwhelmed by the constant influx of requests via email, Slack, and meetings. She needs a central place to capture everything and ensure tasks are created consistently (using SOPs) and assigned to the right people without her having to manually format every single one.
  * **Ben, the Developer:** A core team member. He wants a clear, uncluttered view of his assigned tasks for the day/week. He needs to quickly understand the requirements, see the checklist of actions (SOP), and update the status as he makes progress. He dislikes complex interfaces and wants to focus on his work, not the tool.

-----

### <span style="color:#0052FF;">**4. Core Epics & Feature Requirements**</span>

#### **Epic 1: The Inbox & AI Genesis Engine**

The Inbox is the entry point for all unstructured work. The AI Genesis Engine is the core intelligent processor that transforms these raw inputs into structured tasks.

  * **1.1. Inbox Capture:**
      * **Description:** A dedicated, minimalist space where users can quickly add notes, ideas, or forwarded requests. Each item is a simple text block.
      * **Requirements:**
          * A clean, single-column list of inbox items.
          * A prominent input field to add a new item (`Cmd/Ctrl + Enter` to submit).
          * Each item must have a creation timestamp.
  * **1.2. AI-Powered Task Creation:**
      * **Description:** A single-click action on an inbox item that initiates the AI workflow.
      * **Requirements:**
          * Each inbox item will display a "✨ Process with AI" button on hover.
          * Upon clicking, the system sends the item's text to the AI model.
          * The AI will analyze the text to extract/generate:
              * **Task Title:** A concise, action-oriented summary.
              * **Task Description:** The original text, cleaned up for clarity.
              * **Suggested Due Date:** Interprets phrases like "end of this week" or "tomorrow."
              * **Suggested Assignee:** Identifies names or roles mentioned in the text and matches them to team members.
          * The processed inbox item is archived, and a new task is created in the project.

#### **Epic 2: Task Anatomy & Management**

A Task is the fundamental unit of work. It must be flexible, informative, and easy to modify.

  * **2.1. Task Attributes:**
      * **Description:** The core data fields associated with every task.
      * **Requirements:**
          * **Title** (Text, Editable)
          * **Description** (Rich Text, Editable, supports checklists)
          * **Assignee** (User Profile, Editable)
          * **Due Date** (Date, Editable)
          * **Status** (Dropdown, Configurable: e.g., *To Do*, *In Progress*, *In Review*, *Done*)
  * **2.2. SOP Template Integration:**
      * **Description:** The AI will identify the task category and automatically append a predefined SOP checklist to the task description.
      * **Requirements:**
          * The system must have a simple repository for SOP templates (e.g., "Bug Report," "New Feature," "Client Onboarding").
          * The AI will be prompted to select the most relevant SOP and merge its checklist into the task description during creation.
          * Example: A task about a "login bug" will automatically get the "Bug Report SOP" checklist appended.
  * **2.3. Interactive Task Editing:**
      * **Description:** Users can seamlessly update any task attribute from any view.
      * **Requirements:**
          * Clicking on a task opens a modal or side panel for detailed editing.
          * Key fields (Assignee, Due Date, Status) can be changed directly on the task card/list item for quick edits. All changes are saved automatically.

#### **Epic 3: The Canvas (Project Visualization)**

The Canvas is the user's workspace. Users can switch between different views of the same project data based on their personal workflow preferences.

  * **3.1. List View:**
      * **Description:** A compact, data-rich table view for quickly scanning and sorting tasks.
      * **Requirements:**
          * Displays tasks in rows with columns for Title, Assignee, Due Date, and Status.
          * Columns are sortable.
  * **3.2. Board (Kanban) View:**
      * **Description:** A visual, status-based workflow view.
      * **Requirements:**
          * Columns represent task statuses (e.g., *To Do*, *In Progress*).
          * Tasks are represented as cards within the columns.
          * Users can drag and drop cards between columns to update task status.
  * **3.3. Calendar View:**
      * **Description:** A time-based view for deadline planning and management.
      * **Requirements:**
          * Displays a monthly or weekly calendar grid.
          * Tasks are plotted on the calendar on their due date.
          * Clicking a task on the calendar opens its details.
  * **3.4. View Persistence:**
      * **Description:** The application remembers the user's preferred view.
      * **Requirements:**
          * The last-used view (List, Board, or Calendar) is saved locally and loaded by default on the user's next visit.

-----

### <span style="color:#0052FF;">**5. Design & UI/UX Principles**</span>

  * **Aesthetic:** Minimalist & Uncluttered. Inspired by Apple's Human Interface Guidelines.
  * **Typography:** A clean, legible sans-serif font (e.g., Inter or SF Pro). Excellent hierarchy through font weight and size.
  * **Color Palette:**
      * **Primary:** White (`#FFFFFF`) and light greys (`#F5F5F7`) for backgrounds.
      * **Text:** Near-black (`#1D1D1F`) for high contrast and readability.
      * **Accent:** A vibrant, confident royal blue (`#0052FF`) used for primary buttons, active states, links, and key UI elements.
  * **Layout:** Generous white space. Content is centered and structured within a clear, logical grid.
  * **Iconography:** Use a lightweight, consistent line-icon set (e.g., SF Symbols or Feather Icons).
  * **Interaction:** Fluid and responsive. Animations are subtle and purposeful, providing feedback without being distracting. Actions like drag-and-drop should feel smooth and natural.

-----

### <span style="color:#0052FF;">**6. Out of Scope for Version 1.0**</span>

  * Gantt charts and timeline views.
  * Advanced reporting and analytics dashboards.
  * Time tracking functionality.
  * Third-party integrations (e.g., Slack, GitHub, Google Calendar).
  * Mobile-native applications (the web app will be responsive).
  * User roles and complex permissions.
  * Customizable automations beyond the core AI workflow.