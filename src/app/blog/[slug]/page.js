import Image from "next/image";

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

const getPostImages = async (input_images_params) => {
  const response = await fetch(
    `http://localhost:3000/api/Blogs/PostImages?${input_images_params}`,
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

  const input_images_params = new URLSearchParams({
    post_id: post[0].post_id,
  });

  const images = await getPostImages(input_images_params);

  if (!post) {
    return <p>پست پیدا نشد</p>;
  }

  return (
    <div className="p-5 flex flex-col gap-3 lg:max-w-[60%] mx-auto">
      <h1 className="text-2xl font-bold">{post[0].post_title}</h1>
      <div className="flex flex-row justify-center items-center">
        <Image
          src={`/images/posts/${post[0].post_feature_image}`}
          width={1000}
          height={500}
          className="rounded-md"
          alt="image not found"
        />
      </div>
      <p className="mt-2 leading-8 text-justify">{post[0].post_content}</p>
      <div className="flex flex-col items-center justify-center">
        {images.map((image) => {
          return (
            <Image
              src={`/images/posts/${image.image_url}`}
              width={1000}
              height={500}
              className="rounded-md"
              alt="image not found"
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogPost;
