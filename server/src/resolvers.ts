import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },
  Mutation: {
    // increments a track's number of views
    // incrementTrackViews: (parent, args, contextValue, info) => {},
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      // - TrackAPI呼び出しがエラーを投げる状況を処理するために、このセクションをtryブロックで囲みましょう。
      try {
        // 更新されたトラックを返す
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        // * しかし、このケースでは、スキーマが要求する3つのフィールド（code、success、message）が、返されたレスポンスには存在しません。なぜなら、これらはREST操作のステータスそのものに関連しているので、そのステータスに基づいてこれらの3つを設定する必要があるからです。
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          // * 返されたトラックを返すことで、クライアントが更新されたトラックを取得できるようになります。
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          // * 更新に失敗しているので、トラックはnullです。
          track: null,
        };
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};
