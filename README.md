# Discord Clone

Live Link: discord-clone-giqf.onrender.com

This is a Discord clone built using Next.js.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contact](#contact)

## Installation

To install the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Khairul-islam98/discord-clone.git
    ```
2. Navigate to the project directory:
    ```bash
    cd discord-clone
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Environment Variables
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=


NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up



DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
UPLOADTHING_TOKEN=



LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

To run this project, you will need to add the following environment variables to your .env file:


## Project Structure

```
└── 📁app
    └── 📁(auth)
        └── 📁(routes)
            └── 📁sign-in
                └── 📁[[...sign-in]]
                    └── page.tsx
            └── 📁sign-up
                └── 📁[[...sign-up]]
                    └── page.tsx
        └── layout.tsx
    └── 📁(invite)
        └── 📁(routes)
            └── 📁invite
                └── 📁[inviteCode]
                    └── page.tsx
    └── 📁(main)
        └── 📁(routes)
            └── 📁server
                └── 📁[serverId]
                    └── 📁channels
                        └── 📁[channelId]
                            └── page.tsx
                    └── 📁conversations
                        └── 📁[memberId]
                            └── page.tsx
                    └── layout.tsx
                    └── page.tsx
        └── layout.tsx
    └── 📁(setup)
        └── page.tsx
    └── 📁api
        └── 📁channels
            └── 📁[channelId]
                └── route.ts
            └── route.ts
        └── 📁direct-messages
            └── route.ts
        └── 📁livekit
            └── route.ts
        └── 📁members
            └── 📁[memberId]
                └── route.ts
        └── 📁messages
            └── route.ts
        └── 📁servers
            └── 📁[serverId]
                └── 📁invite-code
                    └── route.ts
                └── 📁leave
                    └── route.ts
                └── route.ts
            └── route.ts
        └── 📁uploadthing
            └── core.ts
            └── route.ts
    └── favicon.ico
    └── globals.css
    └── layout.tsx

    
```
```
└── 📁components
    └── 📁chat
        └── chat-header.tsx
        └── chat-input.tsx
        └── chat-item.tsx
        └── chat-messages.tsx
        └── chat-video-buttom.tsx
        └── chat-welcome.tsx
    └── 📁modals
        └── create-channel-modal.tsx
        └── create-server-modal.tsx
        └── delete-channel-modal.tsx
        └── delete-message-modal.tsx
        └── delete-modal.tsx
        └── edit-channel-modal.tsx
        └── edit-server-modal.tsx
        └── initial-modal.tsx
        └── invite-modal.tsx
        └── leave-modal.tsx
        └── members-modal.tsx
        └── message-file-modal.tsx
    └── 📁navigation
        └── navigation-action.tsx
        └── navigation-item.tsx
        └── navigation-sidebar.tsx
    └── 📁providers
        └── modal-provider.tsx
        └── query-provider.tsx
        └── socket-provider.tsx
        └── theme-provider.tsx
    └── 📁server
        └── server-channel.tsx
        └── server-hearder.tsx
        └── server-member.tsx
        └── server-search.tsx
        └── server-section.tsx
        └── server-sidebar.tsx
    └── 📁ui
        └── avatar.tsx
        └── badge.tsx
        └── button.tsx
        └── command.tsx
        └── dialog.tsx
        └── dropdown-menu.tsx
        └── form.tsx
        └── input.tsx
        └── label.tsx
        └── popover.tsx
        └── scroll-area.tsx
        └── select.tsx
        └── separator.tsx
        └── sheet.tsx
        └── tooltip.tsx
    └── action-tooltip.tsx
    └── emoji-popover.tsx
    └── file-upload.tsx
    └── media-room.tsx
    └── mobile-toggle.tsx
    └── mode-toggle.tsx
    └── socket-indicator.tsx
    └── user-avatar.tsx
    └── user-button-wrapper.tsx
```
```
└── 📁hooks
    └── use-chat-query.ts
    └── use-chat-scroll.ts
    └── use-chat-socket.ts
    └── use-modal-store.ts
    └── use-origin.ts
```

```
└── 📁pages
    └── 📁api
        └── 📁socket
            └── 📁direct-messages
                └── [directMessageId].ts
                └── index.ts
            └── 📁messages
                └── [messageId].ts
                └── index.ts
            └── io.ts
```