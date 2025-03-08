export const revalidate = 60;

const getPost = async (input_params) => {
  const response = await fetch(
    `http://localhost:3000/api/Blogs/Post?${input_params}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
};

const BlogPost = async ({ params }) => {
  const { slug } = await params;

  if (!slug) {
    return <p>پست پیدا نشد</p>;
  }

  const input_params = new URLSearchParams({
    post_title: slug,
  });

  const post = await getPost(input_params);

  if (!post) {
    return <p>پست پیدا نشد</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{post[0].post_title}</h1>
      <p className="mt-2">{post[0].post_content}</p>
    </div>
  );
};

export default BlogPost;
