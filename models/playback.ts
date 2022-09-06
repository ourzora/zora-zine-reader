export enum Provider {
    MUX = 'MUX',
}

export enum Resolution {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    UNKNOWN = 'UNKNOWN',
}

export enum PlaybackStatus {
    UNKNOWN = 'UNKNOWN',
    PROCESSING = 'PROCESSING',
    ERRORED = 'ERRORED',
    READY = 'READY',
}

export interface Playback {
    maxResolution: Resolution
    provider: Provider
    status: PlaybackStatus
    error?: string
    playbackId: string
}
