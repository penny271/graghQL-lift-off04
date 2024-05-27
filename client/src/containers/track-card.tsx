import React from "react";
import styled from "@emotion/styled";
import { colors, mq } from "../styles";
import { humanReadableTimeFromSeconds } from "../utils/helpers";
import { Link } from "react-router-dom";
import type { Track } from "../__generated__/graphql";
// 追加 2024/05/27
import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";

/**
 * Mutation to increment a track's number of views
 */
const INCREMENT_TRACK_VIEWS = gql(`
  mutation IncrementTrackViews($incrementTrackViewsId: ID!) {
    incrementTrackViews(id: $incrementTrackViewsId) {
      code
      success
      message
      track {
        id
        numberOfViews
      }
    }
  }
`);

/**
 * Track Card component renders basic info in a card format
 * for each track populating the tracks grid homepage.
 */
const TrackCard: React.FC<{ track: Omit<Track, "modules"> }> = ({ track }) => {
  const { title, thumbnail, author, length, modulesCount, id } = track;

  // * TrackCard コンポーネントの中で、まずフックを呼び出します。最初のパラメータとして、先ほど設定した INCREMENT_TRACK_VIEWS という変異を受け取ります。
  // * 2番目のパラメータは、変数キーを持つoptionsオブジェクトです。ここでは、incrementTrackViewsId変数を追加し、ナビゲートするトラックのidに設定します。このidはすでにtrack propからトップで構造化解除されています。

  // ^ useQueryの場合とは異なり、useMutationを呼び出しても実際に自動的に変異が実行されるわけではありません！その代わりに、useMutationフックは2つの要素を持つ配列を返します。
  // ^ 最初の要素は、後で実際に突然変異を実行するために使う mutate 関数です。これをincrementTrackViewsと呼ぶことにする。2番目の要素は、変異に関する情報（loading, error and data）を持つオブジェクトです。このコンポーネントには必要ないので、取り出す必要はありません。
  const [incrementTrackViews] = useMutation(INCREMENT_TRACK_VIEWS, {
    variables: { incrementTrackViewsId: id },
    // to observe what the mutation response returns
    onCompleted: (data) => {
      console.log(data);
      // {incrementTrackViews: {…}}
      // incrementTrackViews
      // : {code: 200, success: true, message: 'Successfully incremented number of views for track c_6', track: {…}, __typename: 'incrementTrackViewsResponse'}
    },
  });

  return (
    // * クリックでトラックのビュー数を増やすために、incrementTrackViews関数をonClickイベントハンドラとしてCardContainerに渡します。
    <CardContainer to={`/track/${id}`} onClick={() => incrementTrackViews()}>
      <CardContent>
        <CardImageContainer>
          <CardImage src={thumbnail || ""} alt={title} />
        </CardImageContainer>
        <CardBody>
          <CardTitle>{title || ""}</CardTitle>
          <CardFooter>
            <AuthorImage src={author.photo || ""} />
            <AuthorAndTrack>
              <AuthorName>{author.name}</AuthorName>
              <TrackLength>
                {modulesCount} modules -{" "}
                {humanReadableTimeFromSeconds(length || 0)}
              </TrackLength>
            </AuthorAndTrack>
          </CardFooter>
        </CardBody>
      </CardContent>
    </CardContainer>
  );
};

export default TrackCard;

/** Track Card styled components */
const CardContainer = styled(Link)({
  borderRadius: 6,
  color: colors.text,
  backgroundSize: "cover",
  backgroundColor: "white",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [mq[0]]: {
    width: "90%",
  },
  [mq[1]]: {
    width: "47%",
  },
  [mq[2]]: {
    width: "31%",
  },
  height: 380,
  margin: 10,
  overflow: "hidden",
  position: "relative",
  ":hover": {
    backgroundColor: colors.pink.lightest,
  },
  cursor: "pointer",
  textDecoration: "none",
});

const CardContent = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "100%",
});

const CardTitle = styled.h3({
  textAlign: "center",
  fontSize: "1.4em",
  lineHeight: "1em",
  fontWeight: 700,
  color: colors.text,
  flex: 1,
});

const CardImageContainer = styled.div({
  height: 220,
  position: "relative",
  "::after": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(250,0,150,0.20)",
  },
});

const CardImage = styled.img({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  filter: "grayscale(60%)",
});

const CardBody = styled.div({
  padding: 18,
  flex: 1,
  display: "flex",
  color: colors.textSecondary,
  flexDirection: "column",
  justifyContent: "space-around",
});

const CardFooter = styled.div({
  display: "flex",
  flexDirection: "row",
});

const AuthorImage = styled.img({
  height: 30,
  width: 30,
  marginRight: 8,
  borderRadius: "50%",
  objectFit: "cover",
});

const AuthorAndTrack = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const AuthorName = styled.div({
  lineHeight: "1em",
  fontSize: "1.1em",
});

const TrackLength = styled.div({
  fontSize: "0.8em",
});
