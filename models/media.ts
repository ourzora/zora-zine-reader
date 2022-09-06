import { User } from './user'
import { Playback } from './playback'
import { MediaType } from './mediaType'
import { Metadata } from './metadata'

export enum Platform {
    ZORA = 'ZORA',
    CATALOG = 'CATALOG',
    MIRROR = 'MIRROR',
    TEXT_BARGAINS = 'TEXT_BARGAINS',
    UNKNOWN = 'UNKNOWN',
}

export interface Media {
    id: number
    contentURI: string
    metadataURI: string
    contentHash: string
    metadataHash: string
    ownerBidShare: string
    creatorBidShare: string
    prevOwnerBidShare: string
    mediaType: MediaType
    platform: Platform
    createdAt: string
    metadata?: Metadata
    playback?: Playback
    owner: User
    creator: User
    prevOwner: User
    hidden?: boolean
    invisible?: boolean
}
