# Project Brief: Blog & Social Content Generator App

## Overview

The application empowers users to generate a complete suite of content—from a detailed blog post to social media snippets (a tweet thread and a LinkedIn post)—based on a single input form. When a user submits a form with a topic and three URL sources, an API triggers a Buildship workflow that:
1. Parses the provided URLs.
2. Sends the topic and parsed text to the Gemini API to generate a blog.
3. Uses the ChatGPT API to create a tweet thread and a LinkedIn post based on the blog content.

The final outputs are:
- Displayed in the user interface.
- Saved to a database for later retrieval.

The app also includes user authentication, content storage, and a dedicated dashboard for users to review all their generated content.

## Style & Design

- **Design Style:** Neobrutalism
- **Color Palette:** Muted colors tailored for comfortable content consumption.
- **UI Aesthetics:** Bold and simple with clear separation of content sections, using robust typography and asymmetrical layouts to emphasize a neobrutalist design.

## Tech Stack

- **Frontend:** 
  - React with Vite
  - TypeScript
  - Tailwind CSS
- **Backend & Workflows:**
  - Buildship (workflow triggered via REST API)
- **Authentication, Storage & Database:**
  - Firebase (Authentication, Storage, and Database)

## Core Features

1. **User Authentication:**
   - Registration and Login (using Firebase Authentication)
   - Secure password recovery and account management

2. **Content Generation:**
   - **Form Submission:** A form with four fields:
     - Topic
     - URL Source 1
     - URL Source 2
     - URL Source 3
   - **API Trigger:** Upon submission, the app calls an API endpoint that triggers the Buildship workflow.
   - **Processing Workflow:**
     - URL parsing
     - Blog generation using the Gemini API
     - Social content generation (tweet thread and LinkedIn post) using ChatGPT API
   - **Output Display:** The generated content is displayed in the UI.

3. **Content Storage & History:**
   - Save all generated content (blog, tweet thread, LinkedIn post) in the Firebase database.
   - Provide a dedicated page for users to view all their previously generated content.

4. **User Dashboard:**
   - Overview of account activity and generated content history.
   - Options to revisit, edit, or share content.

5. **Responsive & Accessible UI:**
   - Designed with Neobrutalism aesthetics.
   - Responsive design for both desktop and mobile platforms.
   - Emphasis on clear content presentation with muted color schemes.

## Pages & Screens

1. **Landing Page:**
   - **Hero Section:** Brief introduction, value proposition, and call-to-action (CTA) to get started.
   - **Features Overview:** Highlight core functionalities and benefits.
   - **Testimonials/Case Studies:** Optional section showcasing user success stories.
   - **Footer:** Navigation links, contact information, and social media links.

2. **Authentication Pages:**
   - **Login Page:** User login form with options for "Forgot Password" and sign-up redirection.
   - **Registration Page:** Form to create a new account.
   - **Password Recovery Page:** Interface for password reset requests.

3. **Dashboard:**
   - **Overview Screen:** Snapshot of recent activities, generated content stats, and notifications.
   - **Content History List:** List view (with filters and search) displaying all user-generated content.
   - **Content Detail View:** Detailed view of an individual piece of content (blog, tweet thread, LinkedIn post) with options to edit, share, or delete.

4. **Content Generation Flow:**
   - **Form Page:** 
     - A single-page form for inputting the topic and up to three URL sources.
     - Clear instructions and input validation.
   - **Loading/Processing Screen:**
     - A visually engaging progress screen indicating the Buildship workflow is processing the input.
   - **Results Page:**
     - Display the generated blog, tweet thread, and LinkedIn post.
     - Options to copy, share, or save the content.
     - CTA for generating new content.

5. **User Profile & Settings:**
   - **Profile Page:** View and update personal details.
   - **Settings:** Manage account settings, notification preferences, and privacy settings.

## Workflow & Data Flow

1. **User Input:**
   - User fills out the form (Topic and URL Sources) and submits.
2. **API Trigger:**
   - A REST API call is made to trigger the Buildship workflow.
3. **Buildship Workflow:**
   - Parses URLs.
   - Sends data to Gemini API for blog generation.
   - Sends blog content to ChatGPT API for tweet thread and LinkedIn post generation.
4. **Output Handling:**
   - Generated content is received by the backend.
   - Content is stored in Firebase (Storage and Database).
   - Final outputs are displayed in the UI.
5. **User Dashboard Update:**
   - New content appears in the user's content history.

## Development Considerations

- **Performance:** Optimize API calls and workflows to reduce wait times.
- **Error Handling:** Robust error handling and user notifications in case of failures (e.g., invalid URLs, API errors).
- **Security:** Ensure secure communication between the frontend, backend, and third-party APIs.
- **Scalability:** Design the application to handle increased user traffic and content generation requests.
- **Accessibility:** Adhere to accessibility standards (e.g., ARIA labels, keyboard navigation).

## Conclusion

This project aims to deliver an intuitive, visually striking, and functionally robust platform for content generation using advanced APIs and automated workflows. The Neobrutalism style will ensure a distinctive aesthetic, while the chosen tech stack provides a modern, scalable, and efficient development environment.

---