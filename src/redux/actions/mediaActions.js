import { ADD_BUCKET, ADD_MEDIA, DELETE_MEDIA, MOVE_MEDIA, ADD_TO_HISTORY } from '../actionTypes';

export const addBucket = (name) => ({
  type: ADD_BUCKET,
  payload: { name }
});

export const addMedia = (bucketId, name, link) => ({
  type: ADD_MEDIA,
  payload: { bucketId, name, link }
});

export const deleteMedia = (bucketId, mediaId) => ({
  type: DELETE_MEDIA,
  payload: { bucketId, mediaId }
});

export const moveMedia = (fromBucketId, toBucketId, mediaId) => ({
  type: MOVE_MEDIA,
  payload: { fromBucketId, toBucketId, mediaId }
});

export const addToHistory = (media) => ({
  type: ADD_TO_HISTORY,
  payload: { ...media, timestamp: Date.now() }
});

