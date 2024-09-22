import { ADD_BUCKET, ADD_MEDIA, DELETE_MEDIA, MOVE_MEDIA, ADD_TO_HISTORY } from '../actionTypes';

const initialState = {
  buckets: [],
  mediaHistory: []
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUCKET:
      return {
        ...state,
        buckets: [
          ...state.buckets,
          { id: Date.now(), name: action.payload.name, media: [] }
        ]
      };

    case ADD_MEDIA:
      return {
        ...state,
        buckets: state.buckets.map(bucket =>
          bucket.id === action.payload.bucketId
            ? {
                ...bucket,
                media: [
                  ...bucket.media,
                  { id: Date.now(), name: action.payload.name, link: action.payload.link }
                ]
              }
            : bucket
        )
      };

    case DELETE_MEDIA:
      return {
        ...state,
        buckets: state.buckets.map(bucket =>
          bucket.id === action.payload.bucketId
            ? {
                ...bucket,
                media: bucket.media.filter(media => media.id !== action.payload.mediaId)
              }
            : bucket
        )
      };

    case MOVE_MEDIA:
      const { fromBucketId, toBucketId, mediaId } = action.payload;
      const fromBucket = state.buckets.find(bucket => bucket.id === fromBucketId);
      const mediaToMove = fromBucket.media.find(media => media.id === mediaId);

      return {
        ...state,
        buckets: state.buckets.map(bucket => {
          if (bucket.id === fromBucketId) {
            return { ...bucket, media: bucket.media.filter(media => media.id !== mediaId) };
          }
          if (bucket.id === toBucketId) {
            return { ...bucket, media: [...bucket.media, mediaToMove] };
          }
          return bucket;
        })
      };

    case ADD_TO_HISTORY:
      console.log('Adding to history', action.payload);   
      return {
        ...state,
        mediaHistory: [...state.mediaHistory, action.payload]
      };

    default:
      return state;
  }
};

export default mediaReducer;
