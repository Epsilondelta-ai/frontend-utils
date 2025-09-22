# EpsilonDelta frontend utils

## Install

```
npm install @epsilondelta-ai/frontend-utils
yarn add @epsilondelta-ai/frontend-utils
pnpm add @epsilondelta-ai/frontend-utils
bun add @epsilondelta-ai/frontend-utils
```

## Usage

### init

```ts
import { initClient } from '@epsilondelta-ai/frontend-utils'

const firebaseOptions = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
}
initClient(firebaseOptions)
```

### auth

- signInWithGithub
- signInWithGoogle
- signInWithMicrosoft
- signInWithApple
- signInWithYahoo
- signInWithGooglePlayGames
- signInWithAppleGameCenter
- signInWithFacebook
- signInWithTwitter

```ts
import { signInWithGithub } from '@epsilondelta-ai/frontend-utils'

async function handleClickGitHubLogin() {
  let user: User;

  try {
    user = await signInWithGithub()
  } catch(error) {
    if (error.code === 'auth/popup-blocked') {
      // "Please, allow pop-ups"
      return
    }
  }

  // store(user)
}

<button type="button" onClick={handleClickGitHubLogin}>Auth With GitHub</button>
```
