import { Media } from './media'

export interface User {
    address: string
    name?: string
    username?: string
    bio?: string
    profileImageURL?: string
    website?: string
    verified?: boolean
    ownedMedias?: Media[]
    createdMedias?: Media[]
    prevOwnedMedias?: Media[]
}

export interface ActiveUser extends User {
    lastSignInTime: number
    createdAt: Date
    updated: Date
}
