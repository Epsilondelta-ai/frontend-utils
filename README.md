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

### store

```ts
import { where } from 'firebase/firestore'
import {
  createDocument,
  createDocuments,
  readDocuments,
  readDocument,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments,
} from '@epsilondelta-ai/frontend-utils'

interface AwesomeData {
  some: string
  awesome: number
  records: boolean
}

const collectionName = 'awesome-collection-name'

const createdData = await createDocument<AwesomeData>(collectionName, {
  some: 'some',
  awesome: 1,
  records: true,
})
const createdDatas = await createDocument<AwesomeData>(collectionName, [
  {
    some: 'your',
    awesome: 2,
    records: true,
  },
  {
    some: 'awesome',
    awesome: 3,
    records: true,
  },
  {
    some: 'records',
    awesome: 4,
    records: true,
  }
])

// @see https://firebase.google.com/docs/firestore/query-data/queries
const documents = await readDocuments(collectionName, where('records', '==', true))
const document = await readDocument(collecionName, createdData.id)

await updateDocument(collectionName, document.id, {
  some: 'awesome',
  awesome: 2,
  records: false,
})
await updateDocuments(collectionName, documents.map((data) => ({
  ...data,
  records: false,
})))

await deleteDocument(collectionName, document.id)
await deleteDocuments(dollectionName, documents.map((data) => data.id))
```
