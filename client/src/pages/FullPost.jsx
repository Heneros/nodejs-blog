import React from "react";
import ReactMarkdown from 'react-markdown';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";

export const FullPost = () => {
  const { id } = useParams();

  // const params = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  // console.log(id);
  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err + `Error`);
        alert('Error fetch post');
      })
  }, []);

  if (isLoading) {
    return <Post isLoading={true} isFullPost />
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        {/* <p>
          {data.text}
        </p> */}
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "John Doe",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "lorem",
          },
          {
            user: {
              fullName: "V",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "lorem4324",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
