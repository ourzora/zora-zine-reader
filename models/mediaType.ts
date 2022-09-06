export enum MediaType {
    IMAGE = 'IMAGE',
    GIF = 'GIF',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    TEXT = 'TEXT',
    UNKNOWN = 'UNKNOWN',
}
export const MediaTypeLookup = {
    [MediaType.IMAGE]: ['image/jpeg', 'image/png'],
    [MediaType.GIF]: ['image/gif'],
    [MediaType.VIDEO]: ['video/mp4', 'video/quicktime'],
    [MediaType.AUDIO]: [
        'audio/mpeg',
        'audio/mp3',
        'audio/vnd.wav',
        'audio/vnd.wave',
        'audio/vnd.wav',
        'audio/wav',
        'audio/wave',
        'audio/x-wav',
    ],
    [MediaType.TEXT]: ['text/markdown', 'text/plain', 'text/plain; charset=utf-8'],
}

export const mimeToMediaType: {
    [key: string]: MediaType
} = {
    'image/jpeg': MediaType.IMAGE,
    'image/png': MediaType.IMAGE,
    'image/tiff': MediaType.IMAGE,
    'image/gif': MediaType.GIF,
    'video/mp4': MediaType.VIDEO,
    'video/quicktime': MediaType.VIDEO,
    'audio/mpeg': MediaType.AUDIO,
    'audio/mp3': MediaType.AUDIO,
    'audio/vnd.wav': MediaType.AUDIO,
    'audio/vnd.wave': MediaType.AUDIO,
    'audio/wav': MediaType.AUDIO,
    'audio/wave': MediaType.AUDIO,
    'audio/x-wav': MediaType.AUDIO,
    'text/markdown': MediaType.TEXT,
    'text/plain': MediaType.TEXT,
    'text/plain; charset=utf-8': MediaType.TEXT,
    'text/markdown; charset=utf-8': MediaType.TEXT,
}
